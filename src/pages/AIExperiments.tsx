import { motion } from 'framer-motion'
import OnboardingAssistant from '@/components/ai-experiments/OnboardingAssistant'
import FeaturePrioritization from '@/components/ai-experiments/FeaturePrioritization'
import ScenarioPicker from '@/components/ai-experiments/ScenarioPicker'
import ProductIdeaGenerator from '@/components/ai-experiments/ProductIdeaGenerator'

export default function AIExperiments() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Experiments</h1>
          <p className="text-lg text-light/70 mb-4">
            Interactive demos that demonstrate AI product intuition—how I think about building AI-powered products.
          </p>
          <p className="text-sm text-light/50">
            Chat uses live AI when deployed with an API key; other demos are pre-written to show my thinking.
          </p>
        </motion.div>

        <OnboardingAssistant />
        <FeaturePrioritization />
        <ScenarioPicker />
        <ProductIdeaGenerator />
      </div>
    </div>
  )
}
