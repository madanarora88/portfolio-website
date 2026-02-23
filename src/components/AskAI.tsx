import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, X, Sparkles } from 'lucide-react'
import { useAskAIStore } from '../stores/askAIStore'

const MOCK_RESPONSES: Record<string, string> = {
  default:
    "I'd start by understanding where users drop off. Analytics can tell you the step, but user interviews reveal the why. For onboarding, the first 24 hours matter most — focus on time to first value.",
  onboarding:
    "Onboarding is about reducing time-to-value, not completing a checklist. I prioritize: 1) Role-based personalization, 2) AI-powered Q&A for repetitive questions, 3) Clear 'what's next' at every step. At JPMorgan we saw 40% faster time-to-productivity with this approach.",
  experience:
    "Great employee experience starts with understanding the real friction — not what HR thinks the problem is. I spent weeks in Walmart distribution centers watching associates use apps before writing a single requirement. That context changes everything.",
  ai:
    "AI in enterprise works best when it disappears into the workflow. The hiring tool I built at Walmart didn't announce itself as AI — it just made offers arrive in 24 hours instead of 2 weeks. That's the right measure: outcomes, not features.",
  product:
    "Product sense is about asking the question no one else is asking. Not 'what should we build' but 'what problem are we actually solving, and for whom, and why now?' Those three constraints narrow scope faster than any prioritization framework.",
  hello:
    "Hi! I'm an AI demo built into this portfolio. Ask me anything about product management, AI products, or how Madan thinks about his work. Try: 'How do you approach enterprise AI?' or 'What makes great product sense?'",
}

function getMockResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.match(/^(hi|hey|hello)/)) return MOCK_RESPONSES.hello
  if (lower.includes('onboard')) return MOCK_RESPONSES.onboarding
  if (lower.includes('experience') || lower.includes('employee')) return MOCK_RESPONSES.experience
  if (lower.includes('ai') || lower.includes('llm') || lower.includes('genai')) return MOCK_RESPONSES.ai
  if (lower.includes('product') || lower.includes('pm') || lower.includes('sense')) return MOCK_RESPONSES.product
  return MOCK_RESPONSES.default
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
}

const RATE_LIMIT_PER_MINUTE = 15

export default function AskAI() {
  const { isOpen, close, toggle } = useAskAIStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: "Hi! Ask me anything about product management, AI, or how I think about building products. I'm powered by live AI when deployed.",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const rateLimitRef = useRef({ count: 0, resetAt: 0 })

  // Register ⌘I / Ctrl+I shortcut globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
        e.preventDefault()
        toggle()
      }
      if (e.key === 'Escape' && isOpen) {
        close()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggle, close, isOpen])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Scroll chat to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isTyping])

  const sendMessage = useCallback(
    async (text: string) => {
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
            body: JSON.stringify({ message: trimmed, history }),
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

      const delay = usedMock ? 500 + Math.random() * 300 : 0
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          { id: (Date.now() + 1).toString(), role: 'assistant', text: responseText },
        ])
        setIsTyping(false)
      }, delay)
    },
    [isTyping, messages]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Floating trigger button */}

      {/* Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />

            {/* Chat panel — inset so it always fits without zooming out */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-4 sm:inset-6 z-[101] flex flex-col pointer-events-none"
            >
              <div className="pointer-events-auto w-full max-w-2xl flex-1 min-h-0 rounded-xl border border-light/10 bg-dark shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-light/10 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-light text-sm">Ask Madan's AI</p>
                      <p className="text-xs text-light/50">Product management · AI · Leadership</p>
                    </div>
                  </div>
                  <button
                    onClick={close}
                    className="p-2 rounded-lg hover:bg-light/10 transition-colors text-light/50 hover:text-light"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages — flex-1 min-h-0 so this area scrolls and doesn't force modal to grow */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 min-h-0 overflow-y-auto p-5 space-y-5"
                >
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
                              : 'bg-light/10 border border-light/10 text-light/90'
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

                {/* Input */}
                <form onSubmit={handleSubmit} className="shrink-0 p-4 border-t border-light/10">
                  <div className="flex gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask anything about product, AI, or leadership..."
                      disabled={isTyping}
                      className="flex-1 bg-light/5 border border-light/10 rounded-lg px-4 py-3 text-light placeholder:text-light/40 outline-none focus:border-primary/50 transition-colors text-sm disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isTyping}
                      className="shrink-0 px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-light/30 mt-2 text-center">
                    Press <kbd className="px-1 py-0.5 rounded bg-light/10 text-light/50">ESC</kbd> to close
                  </p>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
