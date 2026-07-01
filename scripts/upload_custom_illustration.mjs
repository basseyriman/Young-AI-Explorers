import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import ws from 'ws'

globalThis.WebSocket = ws

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function run() {
  const titleQuery = 'AI in Aviation Fuel Efficiency'
  const imagePath = 'C:\\Users\\basse\\.gemini\\antigravity\\brain\\e64f2396-9b77-4bed-a589-5f3c51ca0937\\aviation_fuel_efficiency_illustrations_v2_1782947956319.png'

  console.log(`Searching for topic: "${titleQuery}"...`)
  const { data: topics, error: fetchErr } = await supabase
    .from('custom_topics')
    .select('*')
    .ilike('title', `%${titleQuery}%`)

  if (fetchErr || !topics || topics.length === 0) {
    console.error("Could not find topic. Error:", fetchErr, "Topics found:", topics)
    process.exit(1)
  }

  const topic = topics[0]
  console.log(`Found topic ID: ${topic.id}`)

  if (!fs.existsSync(imagePath)) {
    console.error(`Local image file does not exist at: ${imagePath}`)
    process.exit(1)
  }

  const fileBuffer = fs.readFileSync(imagePath)
  const objectPath = `custom-topics/${topic.id}.png`

  console.log(`Uploading image to storage bucket "topic-illustrations" at path "${objectPath}"...`)
  const { error: uploadErr } = await supabase.storage
    .from('topic-illustrations')
    .upload(objectPath, fileBuffer, { contentType: 'image/png', upsert: true })

  if (uploadErr) {
    console.error("Upload failed:", uploadErr)
    process.exit(1)
  }

  const { data: publicUrlData } = supabase.storage
    .from('topic-illustrations')
    .getPublicUrl(objectPath)

  const publicUrl = publicUrlData.publicUrl
  console.log(`Uploaded successfully! Public URL: ${publicUrl}`)

  console.log("Updating custom_topics database record...")
  const { error: updateErr } = await supabase
    .from('custom_topics')
    .update({
      illustration_url: publicUrl,
      content_status: 'ready'
    })
    .eq('id', topic.id)

  if (updateErr) {
    console.error("Database update failed:", updateErr)
    process.exit(1)
  }

  console.log("Database updated successfully! All done!")
}
run().catch(console.error)
