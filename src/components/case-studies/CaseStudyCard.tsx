import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { CaseStudy } from '../../data/caseStudies'

interface CaseStudyCardProps {
  study: CaseStudy
  index: number
}

export default function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/case-studies/${study.id}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          className="block bg-light/5 backdrop-blur-sm p-8 rounded-xl border border-light/10 hover:border-primary/30 transition-colors h-full"
        >
          <div className="flex items-center gap-2 text-sm text-light/50 mb-3">
            <span>{study.company}</span>
            <span>•</span>
            <span>{study.timeline}</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">{study.title}</h2>
          <p className="text-light/70 mb-6 line-clamp-2">{study.summary}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {study.metrics.slice(0, 4).map((metric) => (
              <div key={metric.label}>
                <div className="text-xl font-bold text-primary">{metric.value}</div>
                <div className="text-sm text-light/60">{metric.label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-primary font-semibold group">
            View Case Study
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
