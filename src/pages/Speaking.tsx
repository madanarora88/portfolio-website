import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { ExternalLink, Play } from 'lucide-react'

const TEDX_VIDEO_ID = 'EFH-T52TI5Y'
const LEAN_AGILE_VIDEO_ID = 'S1gIv2EJbTo'

type VideoCardProps = {
  videoId: string
  title: string
  description: string
  href: string
}

function VideoCard({ videoId, title, description, href }: VideoCardProps) {
  return (
    <div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-video rounded-xl overflow-hidden border border-light/10 bg-light/5 relative group"
        aria-label={`Watch ${title} on YouTube`}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={`${title} - Click to watch`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
          </div>
        </div>
      </a>
      <div className="mt-3">
        <h3 className="font-bold text-light mb-1">{title}</h3>
        <p className="text-sm text-light/60 mb-2">{description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm"
        >
          Watch on YouTube <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

export default function Speaking() {
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold mb-6">Talks</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {profile.links.tedTalk && (
              <VideoCard
                videoId={TEDX_VIDEO_ID}
                title="TEDx Talk"
                description="Life is a lot like Bowling. A TEDx talk on mindset, habits, and how the best leaders think."
                href={profile.links.tedTalk}
              />
            )}
            <VideoCard
              videoId={LEAN_AGILE_VIDEO_ID}
              title="Lean Agile Leadership Talk"
              description="Building with speed, feedback, and continuous improvement. Lean and Agile practices for product leaders."
              href="https://youtu.be/S1gIv2EJbTo"
            />
          </div>
        </motion.div>

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
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
