import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface PrincipleCardProps {
  principle: {
    title: string
    description: string
    example: string
  }
  index: number
}

export default function PrincipleCard({ principle, index }: PrincipleCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-light/5 backdrop-blur-sm rounded-xl border border-light/10 hover:border-primary/30 transition-colors overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold">{principle.title}</h3>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            className="shrink-0 text-light/50"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.span>
        </div>
        <p className="text-light/70 mt-3">{principle.description}</p>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 pt-0">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm font-medium text-primary mb-1">Example</p>
                <p className="text-light/90">{principle.example}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
