import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import type { CaseStudy } from '../../data/caseStudies'

interface CaseStudyEngineProps {
  study: CaseStudy
}

export default function CaseStudyEngine({ study }: CaseStudyEngineProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = study.steps.length

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, totalSteps - 1))
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0))

  const step = study.steps[currentStep]

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-light/60 hover:text-primary mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Case Studies
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 text-sm text-light/50 mb-3">
            <span>{study.company}</span>
            <span>•</span>
            <span>{study.role}</span>
            <span>•</span>
            <span>{study.timeline}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{study.title}</h1>
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2">
          {study.steps.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setCurrentStep(i)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                i === currentStep
                  ? 'bg-primary text-white'
                  : 'bg-light/5 text-light/60 hover:bg-light/10 hover:text-light/80'
              }`}
            >
              {i + 1}. {s.title}
            </button>
          ))}
        </div>

        {/* Step content */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-light/5 backdrop-blur-sm border border-light/10 rounded-xl p-8 md:p-10"
            >
              <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-2">
                Step {currentStep + 1} of {totalSteps}
              </p>
              <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
              <p className="text-light/60 text-sm mb-6">{step.subtitle}</p>
              <p className="text-light/90 leading-relaxed">{step.content}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-light/20 text-light/80 hover:bg-light/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          <span className="text-light/50 text-sm">
            {currentStep + 1} / {totalSteps}
          </span>
          <button
            onClick={goNext}
            disabled={currentStep === totalSteps - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Metrics summary */}
        <div className="mt-16 pt-12 border-t border-light/10">
          <h3 className="text-lg font-semibold mb-6">Outcome metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {study.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-2xl font-bold text-primary">{m.value}</div>
                <div className="text-sm text-light/60">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
