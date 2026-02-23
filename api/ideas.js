/**
 * Serverless product idea generator API (Vercel).
 * Set ANTHROPIC_API_KEY in Vercel project Environment Variables for live AI.
 * Falls back to { useMock: true } when no key is present.
 */

const CLAUDE_MODEL = 'claude-3-5-haiku-20241022'

function cors(res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function extractIdeasFromText(raw) {
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    const arrayMatch = raw.match(/\[[\s\S]*?\]/)
    if (arrayMatch) {
      try {
        parsed = JSON.parse(arrayMatch[0])
      } catch {
        return null
      }
    } else {
      return null
    }
  }
  const ideas = Array.isArray(parsed)
    ? parsed
    : parsed.ideas || parsed.product_ideas || (Array.isArray(Object.values(parsed)?.[0]) ? Object.values(parsed)[0] : null)
  return Array.isArray(ideas) && ideas.length > 0 ? ideas.slice(0, 3) : null
}

export default async function handler(req, res) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(200).json({ useMock: true, ideas: null })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid JSON', useMock: true })
  }

  const topic = body?.topic?.trim()
  if (!topic) {
    return res.status(400).json({ error: 'Missing topic', useMock: true })
  }

  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const client = new Anthropic({ apiKey })

    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 300,
      system: `You are a senior product strategist. Generate exactly 3 concise, distinct, actionable product ideas for the problem space given. Each idea should be 1-2 sentences max. Focus on real user value and viable execution. Return valid JSON only: an object with key "ideas" and value an array of 3 strings, e.g. {"ideas": ["idea 1", "idea 2", "idea 3"]}.`,
      messages: [{ role: 'user', content: `Generate 3 product ideas for this problem space: ${topic}` }],
    })

    const textBlock = response.content?.find((b) => b.type === 'text')
    const raw = textBlock?.text?.trim()
    if (!raw) return res.status(200).json({ useMock: true, ideas: null })

    const ideas = extractIdeasFromText(raw)
    if (!ideas) return res.status(200).json({ useMock: true, ideas: null })

    return res.status(200).json({ ideas })
  } catch (err) {
    console.error('Ideas API error:', err.message)
    return res.status(200).json({ useMock: true, ideas: null })
  }
}
