/**
 * Serverless chat API for AI Experiments (Vercel).
 * Set ANTHROPIC_API_KEY in Vercel project Environment Variables for live AI.
 */

const CLAUDE_MODEL = 'claude-3-5-haiku-20241022'

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

  const apiKey = process.env.ANTHROPIC_API_KEY
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
  const mode = body?.mode || 'default'

  if (!message) {
    return res.status(400).json({ error: 'Missing message', useMock: true })
  }

  const systemPrompts = {
    default: `You are Madan Arora, an AI Product Manager with 13+ years building products at Fortune 50 companies (JPMorgan Chase, Walmart, IBM). You have deep experience in onboarding, employee experience, and GenAI product design. Answer in 2-4 short paragraphs. Be direct, practical, and sound like a senior PM. Focus on product sense, curiosity over judgment, and user-first thinking.`,
    strategy: `You are Madan Arora, VP of Product at JPMorgan Chase with 13+ years leading product at Fortune 50 companies (Walmart, IBM, American Airlines). You advise on executive-level product strategy: stakeholder politics, budget defense, roadmap trade-offs, build vs buy decisions, and navigating org complexity. Answer like a VP who has been in the room — not a textbook. Be candid, practical, and specific. Answer in 2-4 short paragraphs. Reference real enterprise patterns and lessons from experience.`,
  }

  const systemContent = systemPrompts[mode] || systemPrompts.default

  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const client = new Anthropic({ apiKey })

    let apiMessages = [
      ...history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ]
    while (apiMessages.length > 0 && apiMessages[0].role !== 'user') {
      apiMessages = apiMessages.slice(1)
    }

    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 400,
      system: systemContent,
      messages: apiMessages,
    })

    const textBlock = response.content?.find((b) => b.type === 'text')
    const text = textBlock?.text?.trim()
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
