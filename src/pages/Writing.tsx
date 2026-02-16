import { motion } from 'framer-motion'
import { ExternalLink, PenLine } from 'lucide-react'
import { writing } from '../data/writing'

export default function Writing() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Writing</h1>
          <p className="text-lg text-light/70">
            Articles and essays on product, AI, and 0→1 building
          </p>
        </motion.div>
        <div className="space-y-6">
          {writing.map((entry, index) => (
            <motion.a
              key={entry.id}
              href={entry.link}
              target={entry.external ? '_blank' : undefined}
              rel={entry.external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01, x: 4 }}
              className="block p-6 rounded-xl bg-light/5 border border-light/10 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">{entry.title}</h2>
                  <p className="text-light/70 mb-3">{entry.excerpt}</p>
                  <p className="text-sm text-light/50">{entry.date}</p>
                </div>
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  {entry.external ? (
                    <ExternalLink className="w-5 h-5 text-primary" />
                  ) : (
                    <PenLine className="w-5 h-5 text-primary" />
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
