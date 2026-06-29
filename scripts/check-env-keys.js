const fs = require('fs')
const path = require('path')

for (const name of ['.env.local', '.env']) {
  const p = path.join(__dirname, '..', name)
  if (!fs.existsSync(p)) {
    console.log(name + ': not found')
    continue
  }
  console.log(name + ': found')
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^(OPENAI_API_KEY|SUPABASE_SERVICE_ROLE_KEY)=(.*)$/)
    if (!m) continue
    const v = m[2].trim().replace(/^["']|["']$/g, '')
    console.log('  ' + m[1] + ': length=' + v.length + ' prefix=' + v.slice(0, 8) + ' suffix=' + v.slice(-4))
  }
}
