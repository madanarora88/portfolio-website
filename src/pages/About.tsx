import { motion } from 'framer-motion'
import { profile, experience } from '../data/profile'
import CareerTimeline from '../components/common/CareerTimeline'
import { ExternalLink } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About</h1>
          <p className="text-lg text-light/70">Bio, experience, and how to work with me</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1"
          >
            <img
              src="/assets/madan-photo.jpg"
              alt={profile.name}
              width={400}
              height={400}
              loading="lazy"
              className="w-full aspect-square object-cover object-[center_25%] rounded-2xl border-4 border-primary/20"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2"
          >
            <h2 className="text-2xl font-bold mb-4">{profile.name}</h2>
            <p className="text-primary font-medium mb-4">{profile.title}</p>
            <p className="text-light/80 mb-6 leading-relaxed">{profile.bio}</p>
            {profile.education && (
              <p className="text-light/60 text-sm mb-4">{profile.education}</p>
            )}
            <div className="flex flex-wrap gap-4">
              {profile.links.tedTalk && (
                <a
                  href={profile.links.tedTalk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors"
                >
                  TEDx Talk <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {profile.links.book && (
                <a
                  href={profile.links.book}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors"
                >
                  Book <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {profile.certifications && profile.certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6">Certifications</h2>
            <ul className="space-y-2">
              {profile.certifications.map((cert, i) => (
                <li key={i} className="flex flex-wrap gap-2 text-light/80">
                  <span className="font-medium text-light">{cert.name}</span>
                  {cert.issuer && (
                    <span className="text-light/50 text-sm">— {cert.issuer}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8">Career Timeline</h2>
          <CareerTimeline experience={experience} />
        </motion.div>
      </div>
    </div>
  )
}
