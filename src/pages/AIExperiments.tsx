import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Grid2X2, HelpCircle, Lightbulb } from 'lucide-react'
import OnboardingAssistant from '@/components/ai-experiments/OnboardingAssistant'
import FeaturePrioritization from '@/components/ai-experiments/FeaturePrioritization'
import ScenarioPicker from '@/components/ai-experiments/ScenarioPicker'
import ProductIdeaGenerator from '@/components/ai-experiments/ProductIdeaGenerator'

const EXPERIMENTS = [
  { id: 'onboarding-assistant', label: 'AI Onboarding Assistant', icon: MessageCircle, desc: 'Chat-style Q&A on product & AI' },
  { id: 'feature-prioritization', label: 'Feature Prioritization Matrix', icon: Grid2X2, desc: 'Impact vs effort quadrants' },
  { id: 'pm-do', label: 'What Would a PM Do?', icon: HelpCircle, desc: 'Scenario-based PM thinking' },
  { id: 'idea-generator', label: 'Mini Product Idea Generator', icon: Lightbulb, desc: 'Quick product idea prompts' },
] as const

export default function AIExperiments() {
  // Ensure we land at top when this page loads (backup for Layout, handles lazy-load timing)
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [])

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Experiments</h1>
          <p className="text-lg text-light/70 mb-4">
            Interactive demos that demonstrate AI product intuition—how I think about building AI-powered products.
          </p>
          <p className="text-sm text-light/50 mb-8">
            Chat uses live AI when deployed with an API key; other demos are pre-written to show my thinking.
          </p>

          <p className="text-sm font-medium text-light/80 mb-3">Jump to an experiment:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Jump to experiment">
            {EXPERIMENTS.map(({ id, label, icon: Icon, desc }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-light/10 hover:bg-primary/20 border-2 border-light/20 hover:border-primary/40 text-left transition-all group"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-light group-hover:text-primary">{label}</div>
                  <div className="text-sm text-light/60">{desc}</div>
                </div>
              </a>
            ))}
          </div>
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
