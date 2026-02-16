import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { productIdeaSeeds } from '../../data/aiExperiments'

const TOPICS = [
  'employee onboarding',
  'customer support',
  'internal tools',
]

export default function ProductIdeaGenerator() {
  const [topic, setTopic] = useState('')
  const [customTopic, setCustomTopic] = useState('')
  const [ideas, setIdeas] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const getTopic = () => customTopic.trim() || topic

  const generate = () => {
    const t = getTopic()
    if (!t) return
    setLoading(true)
    setIdeas([])
    setTimeout(() => {
      const key = Object.keys(productIdeaSeeds).find((k) =>
        t.toLowerCase().includes(k)
      ) || 'default'
      const list = productIdeaSeeds[key] || productIdeaSeeds.default
      setIdeas(list)
      setLoading(false)
    }, 600 + Math.random() * 400)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-2">Mini Product Idea Generator</h2>
      <p className="text-light/60 mb-4">
        Enter a problem space or pick a topic. Get 3 product ideas (pre-written—no API). Great for brainstorming.
      </p>

      <div className="rounded-xl border border-light/10 bg-light/5 p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTopic(t); setCustomTopic('') }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                topic === t ? 'bg-primary text-white' : 'bg-light/10 text-light/80 hover:bg-light/20'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => { setCustomTopic(e.target.value); setTopic('') }}
            placeholder="Or type a problem space (e.g. hiring, payments)..."
            className="flex-1 bg-dark border border-light/10 rounded-lg px-4 py-3 text-light placeholder:text-light/40 outline-none focus:border-primary/50"
          />
          <button
            type="button"
            onClick={generate}
            disabled={loading || !getTopic()}
            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            Generate
          </button>
        </div>

        {ideas.length > 0 && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {ideas.map((idea, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-3 p-3 rounded-lg bg-dark/50 border border-light/10"
              >
                <span className="shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-light/90">{idea}</p>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.div>
  )
}
