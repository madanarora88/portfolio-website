import { motion } from 'framer-motion'

interface TimelineItem {
  company: string
  title: string
  period: string
  location: string
  description: string
  achievements: string[]
  impact: string
}

interface CareerTimelineProps {
  experience: TimelineItem[]
}

export default function CareerTimeline({ experience }: CareerTimelineProps) {
  return (
    <div className="relative pl-8 border-l-2 border-light/10">
      {experience.map((item, index) => (
        <motion.div
          key={item.company + item.period}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="relative pb-12 last:pb-0"
        >
          <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-primary border-4 border-dark" />
          <div className="pt-0">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 rounded-xl bg-light/5 border border-light/10 hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-wrap gap-2 text-sm text-light/50 mb-2">
                <span>{item.period}</span>
                <span>•</span>
                <span>{item.location}</span>
              </div>
              <h3 className="text-xl font-bold mb-1">{item.title}</h3>
              <p className="text-primary font-medium mb-3">{item.company}</p>
              <p className="text-light/70 text-sm mb-4">{item.description}</p>
              <ul className="space-y-1 text-sm text-light/80 mb-4">
                {item.achievements.slice(0, 3).map((a, i) => (
                  <li key={i}>• {a}</li>
                ))}
              </ul>
              <p className="text-sm font-medium text-primary">{item.impact}</p>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
