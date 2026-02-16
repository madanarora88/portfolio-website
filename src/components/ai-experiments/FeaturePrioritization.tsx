import { useState } from 'react'
import { motion } from 'framer-motion'
import { GripVertical, Trash2 } from 'lucide-react'

type Impact = 1 | 2 | 3 | 4 | 5
type Effort = 1 | 2 | 3 | 4 | 5

interface Feature {
  id: string
  name: string
  impact: Impact
  effort: Effort
}

const DEFAULT_FEATURES: Feature[] = [
  { id: '1', name: 'Dark mode', impact: 3, effort: 1 },
  { id: '2', name: 'Export to PDF', impact: 4, effort: 2 },
  { id: '3', name: 'Custom dashboards', impact: 5, effort: 4 },
  { id: '4', name: 'API for third parties', impact: 4, effort: 5 },
  { id: '5', name: 'In-app chat support', impact: 3, effort: 3 },
]

function getQuadrant(impact: number, effort: number): string {
  if (impact >= 4 && effort <= 2) return 'Do first'
  if (impact >= 4 && effort > 2) return 'Plan carefully'
  if (impact < 4 && effort <= 2) return 'Quick wins'
  return 'Deprioritize'
}

function getQuadrantColor(quadrant: string): string {
  switch (quadrant) {
    case 'Do first': return 'border-green-500/50 bg-green-500/10'
    case 'Quick wins': return 'border-primary/50 bg-primary/10'
    case 'Plan carefully': return 'border-amber-500/50 bg-amber-500/10'
    default: return 'border-light/20 bg-light/5'
  }
}

export default function FeaturePrioritization() {
  const [features, setFeatures] = useState<Feature[]>(DEFAULT_FEATURES)
  const [newName, setNewName] = useState('')

  const addFeature = () => {
    if (!newName.trim()) return
    const newFe: Feature = {
      id: Date.now().toString(),
      name: newName.trim(),
      impact: 3,
      effort: 3,
    }
    setFeatures((f) => [...f, newFe])
    setNewName('')
  }

  const updateFeature = (id: string, field: 'impact' | 'effort', value: number) => {
    setFeatures((f) =>
      f.map((fe) => (fe.id === id ? { ...fe, [field]: value as Impact & Effort } : fe))
    )
  }

  const removeFeature = (id: string) => {
    setFeatures((f) => f.filter((fe) => fe.id !== id))
  }

  const byQuadrant = features.reduce<Record<string, Feature[]>>((acc, fe) => {
    const q = getQuadrant(fe.impact, fe.effort)
    if (!acc[q]) acc[q] = []
    acc[q].push(fe)
    return acc
  }, {})
  const order = ['Do first', 'Quick wins', 'Plan carefully', 'Deprioritize']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-2">Feature Prioritization Matrix</h2>
      <p className="text-light/60 mb-4">
        Plot features by impact (1–5) and effort (1–5). Use this to decide what to build first.
      </p>

      <div className="rounded-xl border border-light/10 bg-light/5 p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addFeature()}
            placeholder="Add a feature..."
            className="flex-1 min-w-[180px] bg-dark border border-light/10 rounded-lg px-3 py-2 text-light placeholder:text-light/40 outline-none focus:border-primary/50"
          />
          <button
            type="button"
            onClick={addFeature}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-medium"
          >
            Add
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {features.map((fe) => (
            <div
              key={fe.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-light/10 bg-dark/50"
            >
              <GripVertical className="w-4 h-4 text-light/40 shrink-0" />
              <span className="font-medium truncate flex-1">{fe.name}</span>
              <div className="flex items-center gap-2 shrink-0">
                <label className="text-xs text-light/50">Impact</label>
                <select
                  value={fe.impact}
                  onChange={(e) => updateFeature(fe.id, 'impact', Number(e.target.value))}
                  className="bg-dark border border-light/10 rounded px-2 py-1 text-sm text-light"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <label className="text-xs text-light/50">Effort</label>
                <select
                  value={fe.effort}
                  onChange={(e) => updateFeature(fe.id, 'effort', Number(e.target.value))}
                  className="bg-dark border border-light/10 rounded px-2 py-1 text-sm text-light"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeFeature(fe.id)}
                className="p-1 text-light/40 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {order.map((q) => (
            <div
              key={q}
              className={`rounded-lg border p-4 ${getQuadrantColor(q)}`}
            >
              <h3 className="font-semibold mb-2">{q}</h3>
              <ul className="space-y-1 text-sm">
                {(byQuadrant[q] || []).map((fe) => (
                  <li key={fe.id}>{fe.name}</li>
                ))}
                {(!byQuadrant[q] || byQuadrant[q].length === 0) && (
                  <li className="text-light/50">—</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
