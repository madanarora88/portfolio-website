/**
 * Serverless chat API for AI Experiments (CommonJS for Vercel).
 * Set OPENAI_API_KEY in Vercel project Environment Variables for live AI.
 */

const OPENAI_MODEL = 'gpt-4o-mini'

function cors(res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

module.exports = async function handler(req, res) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(200).json({ useMock: true, text: null })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid JSON', useMock: true })
  }

  const message = body?.message?.trim()
  const history = Array.isArray(body?.history) ? body.history : []

  if (!message) {
    return res.status(400).json({ error: 'Missing message', useMock: true })
  }

  try {
    const OpenAI = (await import('openai')).default
    const openai = new OpenAI({ apiKey })

    const messages = [
      {
        role: 'system',
        content: `You are Madan Arora, an AI Product Manager with 13+ years building products at Fortune 50 companies (JPMorgan Chase, Walmart, IBM). You have deep experience in onboarding, employee experience, and GenAI product design. Answer in 2-4 short paragraphs. Be direct, practical, and sound like a senior PM. Focus on product sense, curiosity over judgment, and user-first thinking.`,
      },
      ...history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ]

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages,
      max_tokens: 400,
      temperature: 0.7,
    })

    const text = completion.choices?.[0]?.message?.content?.trim()
    if (!text) {
      return res.status(200).json({ useMock: true, text: null })
    }
    return res.status(200).json({ text })
  } catch (err) {
    console.error('Chat API error:', err.message)
    const code = err.status === 429 ? 429 : 502
    return res.status(code).json({
      error: err.status === 429 ? 'Rate limit exceeded' : 'AI unavailable',
      useMock: true,
    })
  }
}
