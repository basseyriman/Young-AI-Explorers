import { groq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

console.log("GROQ_API_KEY set:", !!process.env.GROQ_API_KEY)
console.log("OPENAI_API_KEY set:", !!process.env.OPENAI_API_KEY)

async function testGroq() {
  try {
    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt: 'Say hello in 5 words.',
    })
    console.log("Groq response:", text)
  } catch (e) {
    console.error("Groq failed:", e)
  }
}

async function testOpenAI() {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: 'a cute robot explorer, cartoon, digital art',
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      }),
    })
    if (!response.ok) {
      console.error("OpenAI failed with status:", response.status, await response.text())
    } else {
      const data = await response.json()
      console.log("OpenAI success! Image generated, base64 length:", data.data?.[0]?.b64_json?.length)
    }
  } catch (e) {
    console.error("OpenAI request crashed:", e)
  }
}

async function run() {
  await testGroq()
  await testOpenAI()
}
run()
