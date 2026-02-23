/**
 * Generic experiment API: systemPrompt + userMessage → Claude → raw text (JSON).
 * Used by Hiring Signal Extractor, PM Decision Pressure Test, Onboarding Failure Detector.
 * Set ANTHROPIC_API_KEY in Vercel Environment Variables.
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
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  const systemPrompt = body?.systemPrompt?.trim()
  const userMessage = body?.userMessage?.trim()
  if (!systemPrompt || !userMessage) {
    return res.status(400).json({ error: 'Missing systemPrompt or userMessage' })
  }

  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const client = new Anthropic({ apiKey })

    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })

    const textBlock = response.content?.find((b) => b.type === 'text')
    const text = textBlock?.text?.trim() ?? ''
    return res.status(200).json({ text })
  } catch (err) {
    console.error('Experiment API error:', err.message)
    return res.status(500).json({ error: err.message || 'AI unavailable' })
  }
}
