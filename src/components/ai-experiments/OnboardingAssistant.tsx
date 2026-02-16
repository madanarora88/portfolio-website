import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Lightbulb } from 'lucide-react'

const MOCK_RESPONSES: Record<string, string> = {
  default: "I'd start by understanding where users drop off. Analytics can tell you the step, but user interviews reveal the why. For onboarding, the first 24 hours matter most—focus on time to first value.",
  onboarding: "Onboarding is about reducing time-to-value, not completing a checklist. I prioritize: 1) Role-based personalization, 2) AI-powered Q&A for repetitive questions, 3) Clear 'what's next' at every step. At JPMorgan we saw 40% faster time-to-productivity with this approach.",
  dropoff: "Drop-off points are symptoms, not causes. Map the funnel, identify the biggest drop, then run 5–10 user interviews. Ask: 'What were you trying to do?' and 'What got in the way?' You'll usually find 1–2 root causes that explain most of the behavior.",
  activation: "Activation = user experienced core value. Define it narrowly. For a project tool, it might be 'created first project.' For onboarding software, 'completed first checklist item.' Then optimize that moment—remove friction, add delight.",
  ai: "AI in onboarding works best for: 1) Personalized content delivery, 2) Q&A automation (RAG over docs), 3) Proactive nudges. Don't use AI for critical decisions without human-in-the-loop in enterprise. Trust builds slowly.",
  curiosity: "Be curious, not judgmental. That's product sense in one sentence. Most product failures don't come from lack of data—they come from lack of curiosity. Judgment closes the loop; curiosity opens it. When a feature fails, the curious PM asks: What changed in their context?",
  product_sense: "Product sense isn't about having the fastest opinion. It's about asking the question no one else is asking. The best PMs I know aren't the most opinionated—they're the most curious. Curiosity builds empathy, empathy builds insight, insight builds great products.",
  rag: "RAG (Retrieval-Augmented Generation) combines generative models with retrieval systems. You pull relevant context from your docs before the LLM generates a response. It reduces hallucination and keeps answers grounded in your product. Essential for enterprise AI.",
  hallucination: "When an AI hallucinates, judgment says 'it's broken.' Curiosity asks: In what scenarios does it fail? How can we build better guardrails? Use human-in-the-loop, ground truth validation, and LLM-as-judge to catch and reduce hallucinations.",
  genai: "For GenAI PM roles: RAG for accuracy, fine-tuning for domain fit, chain-of-thought for complex reasoning. Validate with human-in-the-loop and build ground truth datasets. Token cost matters—optimize input/output length.",
  data: "Data-driven = let the numbers decide. Data-informed = use data as one input alongside user research, intuition, and context. I prefer data-informed—metrics tell you what happened, not why. Combine analytics with 5–10 user interviews.",
  metrics: "Every metric should connect to user value and business impact. $15–20M annual savings isn't just a number—it's 500K+ hours given back to HR teams. Start with the North Star, then work backward to leading indicators.",
  hello: "Hi! I'm a demo of how I think about AI product design. Try asking: 'How do you approach onboarding drop-off?' or 'What's the difference between curiosity and judgment in product?' or 'How does RAG reduce hallucination?'",
}

function getResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.match(/^(hi|hey|hello|howdy)/)) return MOCK_RESPONSES.hello
  if (lower.includes("curiosity") || lower.includes("judgment") || lower.includes("judgement")) return MOCK_RESPONSES.curiosity
  if (lower.includes("product sense")) return MOCK_RESPONSES.product_sense
  if (lower.includes("rag") || lower.includes("retrieval")) return MOCK_RESPONSES.rag
  if (lower.includes("hallucinat")) return MOCK_RESPONSES.hallucination
  if (lower.includes("genai") || lower.includes("gen ai") || lower.includes("llm")) return MOCK_RESPONSES.genai
  if (lower.includes("data-driven") || lower.includes("data-informed") || lower.includes("data informed")) return MOCK_RESPONSES.data
  if (lower.includes("metric") || lower.includes("measure")) return MOCK_RESPONSES.metrics
  if (lower.includes("onboarding")) return MOCK_RESPONSES.onboarding
  if (lower.includes("drop") || lower.includes("dropoff") || lower.includes("abandon") || lower.includes("churn")) return MOCK_RESPONSES.dropoff
  if (lower.includes("activation")) return MOCK_RESPONSES.activation
  if (lower.includes("ai") || lower.includes("artificial")) return MOCK_RESPONSES.ai
  return MOCK_RESPONSES.default
}

const SUGGESTED_PROMPTS = [
  "How do you approach onboarding drop-off?",
  "What's the difference between curiosity and judgment?",
  "How does RAG reduce hallucination?",
  "Data-driven vs data-informed?",
  "What makes great activation?",
]

const RATE_LIMIT_PER_MINUTE = 15

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
  isTyping?: boolean
}

export default function OnboardingAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: "Hi! Ask a product or AI question. When this site is deployed with an API key, you'll get live AI; otherwise you'll see my pre-written demo responses.",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [rateLimitHit, setRateLimitHit] = useState(false)
  const [usedFallback, setUsedFallback] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const rateLimitRef = useRef({ count: 0, resetAt: 0 })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return
    const trimmed = text.trim()

    const now = Date.now()
    if (now > rateLimitRef.current.resetAt) {
      rateLimitRef.current = { count: 0, resetAt: now + 60_000 }
    }
    if (rateLimitRef.current.count >= RATE_LIMIT_PER_MINUTE) {
      setRateLimitHit(true)
      setTimeout(() => setRateLimitHit(false), 3000)
    }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: trimmed }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setIsTyping(true)

    let responseText: string
    let usedMock = false

    if (rateLimitRef.current.count < RATE_LIMIT_PER_MINUTE) {
      rateLimitRef.current.count++
      try {
        const history = messages
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .slice(-10)
          .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.text }))
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, history }),
        })
        const data = await res.json().catch(() => ({}))
        if (res.ok && data.text) {
          responseText = data.text
        } else {
          usedMock = true
          responseText = getResponse(trimmed)
        }
      } catch {
        usedMock = true
        responseText = getResponse(trimmed)
      }
    } else {
      usedMock = true
      responseText = getResponse(trimmed)
    }

    if (usedMock) setUsedFallback(true)
    const delay = usedMock ? 500 + Math.random() * 200 : 0
    setTimeout(() => {
      setMessages((m) => [...m, { id: (Date.now() + 1).toString(), role: 'assistant', text: responseText }])
      setIsTyping(false)
    }, delay)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-2">AI Onboarding Assistant</h2>
      <p className="text-light/60 mb-4">
        Ask product or AI questions. When deployed with <code className="text-xs bg-light/10 px-1 rounded">OPENAI_API_KEY</code>, you get live AI (rate-limited); otherwise pre-written demo responses.
      </p>
      {usedFallback && (
        <p className="text-sm text-primary/80 mb-2">Using demo responses (API not configured or rate limit).</p>
      )}
      {rateLimitHit && (
        <p className="text-sm text-amber-400/90 mb-2">Rate limit: 15/min. Using demo response.</p>
      )}

      {/* Suggested prompts */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => sendMessage(prompt)}
            disabled={isTyping}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-light/5 border border-light/10 hover:border-primary/30 hover:bg-primary/5 text-sm text-light/80 transition-colors disabled:opacity-50"
          >
            <Lightbulb className="w-3.5 h-3.5 text-primary/70 shrink-0" />
            {prompt}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-light/10 bg-light/5 overflow-hidden">
        <div className="h-96 overflow-y-auto p-4 space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-light/10 border border-light/10'
                  }`}
                >
                  {msg.isTyping ? (
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-light/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-light/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-light/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="rounded-lg px-4 py-3 bg-light/10 border border-light/10">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-light/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-light/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-light/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t border-light/10">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a product or AI question..."
              className="flex-1 bg-dark border border-light/10 rounded-lg px-4 py-3 text-light placeholder:text-light/40 outline-none focus:border-primary/50 transition-colors"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="shrink-0 px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
