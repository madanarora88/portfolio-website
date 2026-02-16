import { motion } from 'framer-motion'
import { caseStudies } from '../data/caseStudies'
import CaseStudyCard from '../components/case-studies/CaseStudyCard'

export default function CaseStudies() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h1>
          <p className="text-lg text-light/70 max-w-2xl">
            Interactive walkthroughs of product decisions, tradeoffs, and outcomes
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
