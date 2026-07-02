import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import ws from 'ws'

globalThis.WebSocket = ws

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function run() {
  const { data: topics, error } = await supabase
    .from('custom_topics')
    .select('id, title, content_status, is_approved')

  console.log("Topics:", JSON.stringify(topics, null, 2))
  console.log("Error:", error)
}
run()
