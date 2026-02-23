import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Lightbulb } from 'lucide-react'

const MOCK_RESPONSES: Record<string, string> = {
  default:
    "That's a classic tension. My starting point is always: what outcome does the business actually need, and what's blocking it? Once you separate the real constraint from the political constraint, you have a path. Most 'strategy' problems are actually stakeholder alignment problems in disguise.",
  pushback:
    "Pushing back on a CTO or CEO is about reframing, not resisting. You don't say 'that's wrong' — you say 'here's what I've learned from users that changes the calculus.' Lead with evidence, acknowledge their goal, and offer a path that gets them there better. I've redirected $40M decisions this way. The key is making the new path feel like their idea.",
  roadmap:
    "New exec, 90-day pressure: give them a win that's real, not a win that's fast. I had this exact situation at JPMC. Instead of shipping something superficial, I scoped an AI-personalized onboarding email — already in the roadmap, measurable, shippable in 8 weeks. The exec used it in her board deck. That bought 18 months of roadmap ownership.",
  budget:
    "Budget defense is a product problem. You're pitching to an audience (leadership) with a specific job to do (allocate capital wisely). Understand their decision criteria before you walk in. What do they fear? What are they measured on? The best budget presentations I've given don't argue for the product — they show how not funding it creates a bigger problem.",
  stakeholders:
    "Alignment isn't a meeting — it's a process. I spend 3 weeks in 1:1s before any major launch review. By the time I'm in the room, every objection has already been addressed. If someone surprises you in a big meeting, you didn't do the pre-work. Map stakeholders by their real constraint (not their stated position), and solve for that.",
  team:
    "Building a high-performing product team starts with clarity on what 'winning' looks like. I write a team charter in the first 30 days: north star metric, decision rights, how we handle disagreement, what we celebrate. It sounds ceremonial. It isn't. When things get hard — and they always do — that clarity is what prevents chaos.",
  ai_strategy:
    "AI product strategy at enterprise scale has three layers: infrastructure (can we actually run this?), trust (will users and regulators accept it?), and value (does it do something users can't do themselves?). Most companies nail layer one, struggle with layer two, and skip layer three entirely. The PMs who win are the ones who obsess over trust.",
  hello:
    "Hi! I'm an AI strategy advisor trained on executive PM thinking. Ask me about stakeholder dynamics, roadmap defense, budget conversations, team building, or AI product strategy. These are the hard decisions senior product leaders face every week.",
}

function getMockResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.match(/^(hi|hey|hello)/)) return MOCK_RESPONSES.hello
  if (lower.includes('push back') || lower.includes('pushback') || lower.includes('disagree') || lower.includes('cto') || lower.includes('ceo')) return MOCK_RESPONSES.pushback
  if (lower.includes('roadmap') || lower.includes('90 day') || lower.includes('quick win') || lower.includes('new exec') || lower.includes('new leader')) return MOCK_RESPONSES.roadmap
  if (lower.includes('budget') || lower.includes('funding') || lower.includes('investment') || lower.includes('resource')) return MOCK_RESPONSES.budget
  if (lower.includes('stakeholder') || lower.includes('align') || lower.includes('politics') || lower.includes('org')) return MOCK_RESPONSES.stakeholders
  if (lower.includes('team') || lower.includes('hire') || lower.includes('manage') || lower.includes('lead')) return MOCK_RESPONSES.team
  if (lower.includes('ai strategy') || lower.includes('ai product') || lower.includes('enterprise ai')) return MOCK_RESPONSES.ai_strategy
  return MOCK_RESPONSES.default
}

const SUGGESTED_PROMPTS = [
  "How do I push back on a pet feature from my CTO?",
  "New exec wants 90-day wins. My roadmap is 18 months. What do I do?",
  "How do I defend my roadmap in a budget review?",
  "How do I align 5 stakeholders with competing priorities before a launch?",
  "What does great AI product strategy look like in enterprise?",
]

const RATE_LIMIT_PER_MINUTE = 15

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
}

export default function ProductStrategyAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: "Hi! I'm an AI strategy advisor. Ask me the hard questions — the kind senior PMs navigate every day. Stakeholder politics, budget defense, roadmap trade-offs. Live AI when deployed; pre-written demo responses otherwise.",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [usedFallback, setUsedFallback] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const rateLimitRef = useRef({ count: 0, resetAt: 0 })

  const hasUserMessage = messages.some((m) => m.role === 'user')
  useEffect(() => {
    if (hasUserMessage && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, hasUserMessage])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return
    const trimmed = text.trim()

    const now = Date.now()
    if (now > rateLimitRef.current.resetAt) {
      rateLimitRef.current = { count: 0, resetAt: now + 60_000 }
    }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: trimmed }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setIsTyping(true)

    let responseText: string
    let usedMock = rateLimitRef.current.count >= RATE_LIMIT_PER_MINUTE

    if (!usedMock) {
      rateLimitRef.current.count++
      try {
        const history = messages
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .slice(-10)
          .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.text }))
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, history, mode: 'strategy' }),
        })
        const data = await res.json().catch(() => ({}))
        if (res.ok && data.text) {
          responseText = data.text
        } else {
          usedMock = true
          responseText = getMockResponse(trimmed)
        }
      } catch {
        usedMock = true
        responseText = getMockResponse(trimmed)
      }
    } else {
      responseText = getMockResponse(trimmed)
    }

    if (usedMock) setUsedFallback(true)
    const delay = usedMock ? 500 + Math.random() * 200 : 0
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: (Date.now() + 1).toString(), role: 'assistant', text: responseText },
      ])
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
      <h2 className="text-2xl font-bold mb-2">AI Product Strategy Advisor</h2>
      <p className="text-light/60 mb-2">
        VP-level strategic thinking on demand. Ask about stakeholder politics, roadmap defense, budget
        conversations, and AI product strategy.
      </p>
      {usedFallback && (
        <p className="text-sm text-primary/80 mb-2">Using demo responses (API not configured).</p>
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
        <div ref={chatContainerRef} className="h-96 overflow-y-auto p-4 space-y-6">
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
                  <p className="text-sm leading-relaxed">{msg.text}</p>
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
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t border-light/10">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a strategic PM question..."
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
