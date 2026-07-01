import { generateTopicContent } from '../src/lib/vision-vee/generate-topic-content'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function run() {
  const title = "AI in Space Exploration"
  const description = "Join your robot guide, Zeta, as you journey into the world of space exploration and learn how Artificial Intelligence helps humans discover new planets, manage space debris, and even send spacecraft all the way to Mars!"
  
  console.log("Generating topic content for title:", title)
  try {
    const result = await generateTopicContent(title, description, 'en')
    console.log("Generation result:", JSON.stringify(result, null, 2))
  } catch (e) {
    console.error("Generation failed:", e)
  }
}
run()
