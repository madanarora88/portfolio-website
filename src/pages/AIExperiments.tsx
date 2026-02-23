import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HiringSignalExtractor from '@/components/ai-experiments/HiringSignalExtractor'
import PMDecisionPressureTest from '@/components/ai-experiments/PMDecisionPressureTest'
import OnboardingFailureDetector from '@/components/ai-experiments/OnboardingFailureDetector'

const TABS = [
  { id: 'hiring', num: '01', color: '#f59e0b', title: 'Hiring Signal Extractor', sub: 'Decode what a company actually needs from their JD' },
  { id: 'decision', num: '02', color: '#3b82f6', title: 'PM Decision Pressure Test', sub: 'Steelman your options. Get a call — not a framework.' },
  { id: 'onboarding', num: '03', color: '#10b981', title: 'Onboarding Failure Detector', sub: 'Find exactly where your flow is bleeding users' },
] as const

export default function AIExperiments() {
  const [active, setActive] = useState<'hiring' | 'decision' | 'onboarding'>('hiring')

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [])

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-light/50 mb-2">AI Experiments</p>
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-3">Products, not demos.</h1>
          <p className="text-light/70 text-sm md:text-base max-w-2xl leading-relaxed">
            Each experiment is a live AI product with a point of view. Every design decision is annotated. This is what building end-to-end looks like.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-light/10 pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`text-left px-4 py-3 rounded-xl border-2 transition-all ${
                active === tab.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-light/10 bg-light/5 text-light/70 hover:border-light/20 hover:text-light'
              }`}
            >
              <span className="text-xs font-mono font-semibold" style={{ color: active === tab.id ? undefined : tab.color }}>{tab.num}</span>
              <span className="block font-semibold text-sm mt-0.5">{tab.title}</span>
              <span className="block text-xs text-light/50 mt-0.5">{tab.sub}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-light/10 bg-light/5 p-6 sm:p-8"
        >
          {active === 'hiring' && <HiringSignalExtractor />}
          {active === 'decision' && <PMDecisionPressureTest />}
          {active === 'onboarding' && <OnboardingFailureDetector />}
        </motion.div>
      </div>
    </div>
  )
}
