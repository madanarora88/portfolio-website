/**
 * Serverless product idea generator API (Vercel).
 * Set OPENAI_API_KEY in Vercel project Environment Variables for live AI.
 * Falls back to { useMock: true } when no key is present.
 */

const OPENAI_MODEL = 'gpt-4o-mini'

function cors(res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default async function handler(req, res) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.OPENAI_API_KEY
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
    const { default: OpenAI } = await import('openai')
    const openai = new OpenAI({ apiKey })

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: 'system',
          content: `You are a senior product strategist. Generate exactly 3 concise, distinct, actionable product ideas for the problem space given. Each idea should be 1-2 sentences max. Focus on real user value and viable execution. Return as a JSON array of strings like: ["idea 1", "idea 2", "idea 3"]`,
        },
        {
          role: 'user',
          content: `Generate 3 product ideas for this problem space: ${topic}`,
        },
      ],
      max_tokens: 300,
      temperature: 0.8,
      response_format: { type: 'json_object' },
    })

    const raw = completion.choices?.[0]?.message?.content?.trim()
    if (!raw) return res.status(200).json({ useMock: true, ideas: null })

    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch {
      return res.status(200).json({ useMock: true, ideas: null })
    }

    // Handle both {"ideas": [...]} and direct array responses
    const ideas = Array.isArray(parsed) ? parsed : (parsed.ideas || parsed.product_ideas || Object.values(parsed)[0])
    if (!Array.isArray(ideas) || ideas.length === 0) {
      return res.status(200).json({ useMock: true, ideas: null })
    }

    return res.status(200).json({ ideas: ideas.slice(0, 3) })
  } catch (err) {
    console.error('Ideas API error:', err.message)
    return res.status(200).json({ useMock: true, ideas: null })
  }
}
