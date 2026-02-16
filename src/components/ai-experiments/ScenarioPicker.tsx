import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pmScenarios } from '../../data/aiExperiments'

export default function ScenarioPicker() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = pmScenarios.find((s) => s.id === selectedId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-2">What Would a PM Do?</h2>
      <p className="text-light/60 mb-4">
        Pick a scenario and see how I'd approach it. Short, practical PM moves.
      </p>

      <div className="grid gap-3 mb-6">
        {pmScenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedId(selectedId === s.id ? null : s.id)}
            className={`text-left p-4 rounded-xl border transition-colors ${
              selectedId === s.id
                ? 'border-primary bg-primary/10'
                : 'border-light/10 bg-light/5 hover:border-primary/30'
            }`}
          >
            <p className="font-medium text-light/90">{s.scenario}</p>
            {selectedId === s.id && (
              <p className="text-sm text-primary mt-2">Click to hide answer</p>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl border border-primary/30 bg-primary/5 p-6"
          >
            <h3 className="font-semibold mb-2">How I'd approach it</h3>
            <p className="text-light/90 leading-relaxed">{selected.pmMove}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
