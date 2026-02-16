import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin } from 'lucide-react'
import { profile } from '../data/profile'

export default function Contact() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-light/70">
            Open to roles and conversations about product, AI, and 0→1 building
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <a
            href={`mailto:${profile.contact.email}`}
            className="flex items-center gap-4 p-6 rounded-xl bg-light/5 border border-light/10 hover:border-primary/30 hover:bg-primary/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-light/50">Email</p>
              <p className="font-medium">{profile.contact.email}</p>
            </div>
          </a>
          <a
            href={`tel:${profile.contact.phone.replace(/\D/g, '')}`}
            className="flex items-center gap-4 p-6 rounded-xl bg-light/5 border border-light/10 hover:border-primary/30 hover:bg-primary/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-light/50">Phone</p>
              <p className="font-medium">{profile.contact.phone}</p>
            </div>
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 rounded-xl bg-light/5 border border-light/10 hover:border-primary/30 hover:bg-primary/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Linkedin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-light/50">LinkedIn</p>
              <p className="font-medium">linkedin.com/in/madan-arora</p>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
