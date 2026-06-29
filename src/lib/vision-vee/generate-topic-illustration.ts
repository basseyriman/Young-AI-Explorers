import { buildCustomTopicIllustrationPrompt } from '@/lib/vision-vee/book-story-style'

export interface TopicIllustrationResult {
  illustrationUrl: string | null
  illustrationPrompt: string
}

export function isPlaceholderIllustration(url: string | null | undefined): boolean {
  if (!url) return true
  return url.startsWith('data:image/svg+xml')
}

/** Branded SVG placeholder — always available, matches book purple/gold palette. */
export function buildTopicIllustrationPlaceholder(title: string): string {
  const safeTitle = title.slice(0, 48).replace(/[<>&"']/g, '')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="640" viewBox="0 0 800 640">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2d1b4e"/>
      <stop offset="100%" style="stop-color:#1a0f2e"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#c9a04e"/>
      <stop offset="100%" style="stop-color:#e8c878"/>
    </linearGradient>
  </defs>
  <rect width="800" height="640" fill="url(#bg)"/>
  <circle cx="400" cy="220" r="90" fill="#c9a04e" opacity="0.15"/>
  <circle cx="520" cy="180" r="40" fill="#c9a04e" opacity="0.1"/>
  <text x="400" y="200" text-anchor="middle" font-size="72" fill="#c9a04e">✨</text>
  <text x="400" y="320" text-anchor="middle" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#f5f0e8">${safeTitle}</text>
  <text x="400" y="360" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#c9a04e" opacity="0.9">VISION VEE CUSTOM TOPIC</text>
  <rect x="250" y="400" width="300" height="4" rx="2" fill="url(#gold)" opacity="0.6"/>
  <text x="400" y="450" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#f5f0e8" opacity="0.65">Young AI Explorers · RimansTech Industries</text>
</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

async function generateWithOpenAI(prompt: string): Promise<Buffer | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) return null

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt.slice(0, 4000),
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      }),
    })

    if (!response.ok) {
      console.error('[Vision Vee] DALL-E request failed:', response.status, await response.text().catch(() => ''))
      return null
    }

    const data = (await response.json()) as { data?: { b64_json?: string }[] }
    const b64 = data.data?.[0]?.b64_json
    if (!b64) return null

    return Buffer.from(b64, 'base64')
  } catch {
    return null
  }
}

async function uploadToSupabaseStorage(topicId: string, imageBuffer: Buffer): Promise<string | null> {
  const admin = (await import('@/utils/supabase/admin')).createAdminClient()
  if (!admin) return null

  const objectPath = `custom-topics/${topicId}.png`
  const { error } = await admin.storage
    .from('topic-illustrations')
    .upload(objectPath, imageBuffer, { contentType: 'image/png', upsert: true })

  if (error) {
    console.error('[Vision Vee] Illustration upload failed:', error.message)
    return null
  }

  const { data } = admin.storage.from('topic-illustrations').getPublicUrl(objectPath)
  return data.publicUrl || null
}

export async function generateTopicIllustration(
  topicId: string,
  title: string,
  description: string,
  storySnippet?: string
): Promise<TopicIllustrationResult> {
  const illustrationPrompt = buildCustomTopicIllustrationPrompt(title, description, storySnippet)

  const imageBuffer = await generateWithOpenAI(illustrationPrompt)
  if (imageBuffer) {
    const publicUrl = await uploadToSupabaseStorage(topicId, imageBuffer)
    if (publicUrl) {
      return { illustrationUrl: publicUrl, illustrationPrompt }
    }
  }

  return {
    illustrationUrl: buildTopicIllustrationPlaceholder(title),
    illustrationPrompt,
  }
}
