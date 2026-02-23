import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

type Project = {
  id: string
  era: string
  name: string
  tagline: string
  story: string
  what: string[]
  learned: string
  outcome?: string
  link?: string
  linkLabel?: string
  images?: string[]
  imageCaption?: string
}

const projects: Project[] = [
  {
    id: 'platerater',
    era: '2013 · Side Project',
    name: 'PlateRater',
    tagline: 'Yelp for individual dishes, not restaurants.',
    story:
      "I built this in 2013 — before 'vibe coding' was a phrase, before LLMs could write a line of JSX. I was frustrated that Yelp rated restaurants but not the specific dish that made a place worth visiting. A restaurant could be 4 stars overall but their Pho was a 2. I wanted to fix that.",
    what: [
      'Designed end-to-end UX: onboarding flow, diet preference personalization, dish-level rating system',
      'Built mobile-first with a 3-step preference wizard to reduce drop-off at first use',
      "Implemented location-aware 'trending plates near you' feed to drive discovery",
      'Shipped Facebook OAuth to reduce sign-up friction (before this was table stakes)',
    ],
    learned:
      "This was my first real lesson in retention vs. acquisition. The app was easy to sign up for but hard to keep using — we needed content density before social could kick in. Classic cold-start problem. I'd solve it differently today: seed content before launch, not after.",
    outcome: 'Shipped to TestFlight. ~200 beta users across Chicago.',
    images: [
      '/assets/plate-rater/1.jpg',
      '/assets/plate-rater/2.jpg',
      '/assets/plate-rater/3.jpg',
      '/assets/plate-rater/4.jpg',
      '/assets/plate-rater/5.jpg',
      '/assets/plate-rater/6.jpg',
      '/assets/plate-rater/7.jpg',
      '/assets/plate-rater/8.jpg',
      '/assets/plate-rater/9.jpg',
      '/assets/plate-rater/10.jpg',
      '/assets/plate-rater/11.jpg',
      '/assets/plate-rater/12-BIG_Card.jpg',
      '/assets/plate-rater/13-Small_Card.jpg',
      '/assets/plate-rater/14.jpg',
      '/assets/plate-rater/15.jpg',
    ],
    imageCaption: 'Early 2013 build — rough edges intentional. Product thinking was the point.',
  },
  {
    id: 'portfolio',
    era: '2025 · AI-Assisted Build',
    name: 'This Portfolio',
    tagline: 'Built in a weekend. The AI was my co-pilot, not the author.',
    story:
      "Most PM portfolios are PDFs. I wanted mine to be a product — something that demonstrates product thinking, not just describes it. I built this using Claude as a coding collaborator, treating it the way I'd treat a junior engineer: with clear specs, iterative feedback, and taste applied at every step.",
    what: [
      'Designed the information architecture before writing a line of code — mapped user flows for recruiters vs. hiring managers vs. PMs',
      'Used AI to generate component scaffolding, then edited everything by hand to match the design vision',
      'Built a Case Study engine with step-by-step navigation to simulate how a PM thinks through a problem',
      'Added Command Palette (⌘K), Ask AI (⌘I), offline support, and scroll-triggered animations — treating portfolio as a real product spec',
    ],
    learned:
      "Working with AI on a real product taught me something important about AI product management: the model is never the moat. The taste, the judgment, the product instinct — those are the moat. The AI made me faster. It didn't make the decisions.",
    outcome: "You're looking at it.",
    link: '#top',
    linkLabel: "You're already here ↗",
  },
  {
    id: 'translator',
    era: '2024 · Weekend Project',
    name: 'Millennial to GenZ Translator',
    tagline: 'A fun experiment in user delight and rapid prototyping.',
    story:
      "A lighthearted weekend project that became a lesson in viral distribution. Built it in an afternoon using Lovable + AI to help millennials decode GenZ slang — not because the world needed it, but because shipping something fun is a skill too.",
    what: [
      'Designed for instant delight: input a phrase, get a GenZ translation with tone and context',
      'Used Lovable for rapid no-code prototyping — from idea to live URL in under 4 hours',
      'Optimized for shareability: output designed to be screenshot-worthy and post-able',
    ],
    learned:
      "Shipping for fun is underrated. The fastest way to sharpen product instincts is to build something with zero stakes. This reminded me that great UX has an emotional component — not everything needs to be enterprise-grade to teach you something.",
    outcome: 'Live and running. Shared across LinkedIn and Twitter.',
    link: 'https://slang-switcheroo.lovable.app/',
    linkLabel: 'Try it live ↗',
  },
]

export default function WeekendProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [galleryIndex, setGalleryIndex] = useState(0)

  return (
    <div className="space-y-4">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl border border-light/10 bg-light/5 backdrop-blur-sm overflow-hidden"
        >
          {/* Header Row */}
          <button
            className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-6 group"
            onClick={() => {
              setExpandedId(expandedId === project.id ? null : project.id)
              setGalleryIndex(0)
            }}
          >
            <div className="flex items-start gap-5">
              <span className="text-3xl font-bold text-light/15 shrink-0 mt-1">0{i + 1}</span>
              <div>
                <p className="text-xs tracking-widest uppercase text-primary mb-1">{project.era}</p>
                <h3 className="text-xl md:text-2xl font-bold text-light group-hover:text-primary transition-colors mb-1">
                  {project.name}
                </h3>
                <p className="text-light/60 text-sm">{project.tagline}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expandedId === project.id ? 45 : 0 }}
              className="shrink-0"
            >
              <Plus className="w-6 h-6 text-light/40" />
            </motion.div>
          </button>

          {/* Expanded Content */}
          <AnimatePresence>
            {expandedId === project.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-light/10"
              >
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-10">
                  {/* Left: Story + What I Built */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-light/40 mb-3">Origin</p>
                      <p className="text-light/80 leading-relaxed">{project.story}</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-light/40 mb-3">
                        What I Built
                      </p>
                      <ul className="space-y-2">
                        {project.what.map((item, j) => (
                          <li key={j} className="flex gap-3 text-sm text-light/70">
                            <span className="text-primary mt-1 shrink-0">→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Learned + Outcome + Screenshots */}
                  <div className="space-y-6">
                    <div className="bg-dark/50 border border-light/10 rounded-xl p-5">
                      <p className="text-xs uppercase tracking-widest text-light/40 mb-3">
                        What I Learned
                      </p>
                      <p className="text-light/70 text-sm leading-relaxed italic">
                        "{project.learned}"
                      </p>
                    </div>

                    {project.outcome && (
                      <div className="p-5 border border-light/10 rounded-xl">
                        <p className="text-xs uppercase tracking-widest text-light/40 mb-2">
                          Outcome
                        </p>
                        <p className="text-light/80 text-sm">{project.outcome}</p>
                      </div>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        target={project.link.startsWith('http') ? '_blank' : undefined}
                        rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-2 text-sm text-primary border border-primary/40 rounded-lg px-5 py-2 hover:bg-primary/10 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        {project.linkLabel || 'View Project'}
                      </a>
                    )}

                    {/* PlateRater screenshot gallery */}
                    {project.images && project.images.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-light/40 mb-3">
                          Screens (2013)
                        </p>
                        <div className="relative">
                          <img
                            src={project.images[galleryIndex]}
                            alt={`${project.name} screen ${galleryIndex + 1}`}
                            className="w-full h-56 object-contain rounded-lg border border-light/10 bg-dark/50"
                          />
                          {project.images.length > 1 && (
                            <div className="flex items-center justify-between mt-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setGalleryIndex((idx) => (idx - 1 + project.images!.length) % project.images!.length)
                                }}
                                className="p-1.5 rounded-lg hover:bg-light/10 transition-colors"
                              >
                                <ChevronLeft className="w-4 h-4 text-light/50" />
                              </button>
                              <span className="text-xs text-light/40">
                                {galleryIndex + 1} / {project.images.length}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setGalleryIndex((idx) => (idx + 1) % project.images!.length)
                                }}
                                className="p-1.5 rounded-lg hover:bg-light/10 transition-colors"
                              >
                                <ChevronRight className="w-4 h-4 text-light/50" />
                              </button>
                            </div>
                          )}
                        </div>
                        {project.imageCaption && (
                          <p className="text-xs text-light/40 mt-2">{project.imageCaption}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
