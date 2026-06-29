/**
 * Test OpenAI DALL-E + Supabase topic-illustrations upload.
 * Run: node scripts/test-illustration-pipeline.js
 */
const fs = require('fs')
const path = require('path')
const ws = require('ws')
const { createClient } = require('@supabase/supabase-js')

const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '')
  }
}

async function main() {
  const openaiKey = process.env.OPENAI_API_KEY?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()

  console.log('OPENAI_API_KEY:', openaiKey ? `set (${openaiKey.slice(0, 7)}...)` : 'MISSING')
  console.log('SUPABASE_SERVICE_ROLE_KEY:', serviceKey ? 'set' : 'MISSING')
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl || 'MISSING')

  if (!openaiKey || !serviceKey || !supabaseUrl) {
    process.exit(1)
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    realtime: { transport: ws },
  })

  const { data: buckets, error: bucketErr } = await admin.storage.listBuckets()
  if (bucketErr) {
    console.log('listBuckets FAIL:', bucketErr.message)
  } else {
    const ids = buckets.map((b) => b.id)
    console.log('Buckets:', ids.join(', ') || '(none)')
    console.log('topic-illustrations exists:', ids.includes('topic-illustrations'))
  }

  const prompt =
    'Friendly cartoon robot and child learning about the sun, vibrant purple and gold children book illustration, no text, ages 8-12'

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    }),
  })

  const bodyText = await response.text()
  console.log('DALL-E status:', response.status)
  if (!response.ok) {
    console.log('DALL-E error:', bodyText.slice(0, 800))
    process.exit(1)
  }

  const data = JSON.parse(bodyText)
  const b64 = data.data?.[0]?.b64_json
  if (!b64) {
    console.log('DALL-E: no image in response')
    process.exit(1)
  }

  const buf = Buffer.from(b64, 'base64')
  console.log('DALL-E image size:', buf.length, 'bytes')

  const objectPath = 'custom-topics/_pipeline-test.png'
  const { error: uploadErr } = await admin.storage
    .from('topic-illustrations')
    .upload(objectPath, buf, { contentType: 'image/png', upsert: true })

  if (uploadErr) {
    console.log('Storage upload FAIL:', uploadErr.message)
    process.exit(1)
  }

  const { data: pub } = admin.storage.from('topic-illustrations').getPublicUrl(objectPath)
  console.log('Upload OK:', pub.publicUrl)

  const head = await fetch(pub.publicUrl, { method: 'HEAD' })
  console.log('Public URL HTTP:', head.status)
  console.log('Pipeline test PASSED')
}

main().catch((e) => {
  console.error('Fatal:', e.message)
  process.exit(1)
})
