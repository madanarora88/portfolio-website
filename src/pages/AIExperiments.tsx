import { motion } from 'framer-motion'
import OnboardingAssistant from '@/components/ai-experiments/OnboardingAssistant'
import FeaturePrioritization from '@/components/ai-experiments/FeaturePrioritization'
import ScenarioPicker from '@/components/ai-experiments/ScenarioPicker'
import ProductIdeaGenerator from '@/components/ai-experiments/ProductIdeaGenerator'

const EXPERIMENTS = [
  { id: 'onboarding-assistant', label: 'AI Onboarding Assistant' },
  { id: 'feature-prioritization', label: 'Feature Prioritization Matrix' },
  { id: 'pm-do', label: 'What Would a PM Do?' },
  { id: 'idea-generator', label: 'Mini Product Idea Generator' },
] as const

export default function AIExperiments() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Experiments</h1>
          <p className="text-lg text-light/70 mb-4">
            Interactive demos that demonstrate AI product intuition—how I think about building AI-powered products.
          </p>
          <p className="text-sm text-light/50 mb-8">
            Chat uses live AI when deployed with an API key; other demos are pre-written to show my thinking.
          </p>

          <nav className="flex flex-wrap gap-2" aria-label="Jump to experiment">
            {EXPERIMENTS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="px-4 py-2 rounded-lg bg-light/10 hover:bg-light/20 border border-light/20 text-light/90 text-sm font-medium transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </motion.div>

        <section id="onboarding-assistant" className="scroll-mt-24">
          <OnboardingAssistant />
        </section>
        <section id="feature-prioritization" className="scroll-mt-24">
          <FeaturePrioritization />
        </section>
        <section id="pm-do" className="scroll-mt-24">
          <ScenarioPicker />
        </section>
        <section id="idea-generator" className="scroll-mt-24">
          <ProductIdeaGenerator />
        </section>
      </div>
    </div>
  )
}
