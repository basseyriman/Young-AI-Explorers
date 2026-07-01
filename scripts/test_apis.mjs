import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function testImageModel(modelName) {
  console.log(`Testing model: ${modelName}`)
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        prompt: 'a cute robot explorer, cartoon, digital art',
        n: 1,
        size: '1024x1024'
      }),
    })
    if (!response.ok) {
      console.error(`Model ${modelName} failed with status:`, response.status, await response.text())
    } else {
      const data = await response.json()
      const b64 = data.data?.[0]?.b64_json
      if (b64) {
        console.log(`Model ${modelName} success! b64 length:`, b64.length)
        const buf = Buffer.from(b64, 'base64')
        console.log(`Buffer size: ${buf.byteLength} bytes`)
      } else {
        console.error(`Model ${modelName} returned success but no b64_json! datakeys:`, Object.keys(data.data?.[0] || {}))
      }
    }
  } catch (e) {
    console.error(`Model ${modelName} crashed:`, e)
  }
}

async function run() {
  await testImageModel('gpt-image-1')
}
run()
