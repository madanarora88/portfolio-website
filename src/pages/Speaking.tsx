import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { ExternalLink, Play } from 'lucide-react'

const TEDX_VIDEO_ID = 'EFH-T52TI5Y'

export default function Speaking() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Speaking</h1>
          <p className="text-lg text-light/70">
            TEDx speaker, conference talks, and booking information
          </p>
        </motion.div>

        {profile.links.tedTalk && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold mb-4">TEDx Talk</h2>
            <div className="aspect-video rounded-xl overflow-hidden border border-light/10 bg-light/5 relative">
              {videoLoaded ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${TEDX_VIDEO_ID}?autoplay=1`}
                  title="TEDx Talk"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setVideoLoaded(true)}
                  className="w-full h-full flex items-center justify-center group cursor-pointer"
                  aria-label="Play TEDx Talk video"
                >
                  <img
                    src={`https://img.youtube.com/vi/${TEDX_VIDEO_ID}/hqdefault.jpg`}
                    alt="TEDx Talk thumbnail"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="relative z-10 w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                  </div>
                </button>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a
                href={profile.links.tedTalk}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                Watch on YouTube <ExternalLink className="w-4 h-4" />
              </a>
              <span className="text-light/50 text-sm hidden sm:inline">|</span>
              <span className="text-light/50 text-sm">
                If the embedded video doesn&apos;t load, click &quot;Watch on YouTube&quot; to view directly
              </span>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-bold">Speaking Topics</h2>
          <ul className="space-y-3 text-light/80">
            <li>• AI Product Management: From hype to shipped</li>
            <li>• Building 0→1 products at Fortune 50 companies</li>
            <li>• Habit formation and product-led growth</li>
            <li>• Scaling employee experience to 1M+ users</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 rounded-xl bg-primary/10 border border-primary/20"
        >
          <h3 className="font-bold mb-2">Booking</h3>
          <p className="text-light/80 mb-4">
            Available for keynote talks, panels, and workshops. Reach out via{' '}
            <a href={`mailto:${profile.contact.email}`} className="text-primary hover:underline">
              email
            </a>{' '}
            or{' '}
            <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              LinkedIn
            </a>.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
