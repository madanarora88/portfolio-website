import { Link } from 'react-router-dom'
import { Linkedin, Mail, ExternalLink } from 'lucide-react'
import { profile } from '../../data/profile'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/ai-experiments', label: 'AI Experiments' },
  { to: '/simulator', label: 'Think Like a PM' },
  { to: '/writing', label: 'Writing' },
  { to: '/about', label: 'About' },
  { to: '/speaking', label: 'Speaking' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-light/5 bg-dark/50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="text-lg font-bold text-light mb-2">{profile.name}</p>
            <p className="text-light/60 text-sm mb-4">{profile.title}</p>
            <div className="flex gap-4">
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/60 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                className="text-light/60 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <nav className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-light/60 hover:text-light text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 pt-8 border-t border-light/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-light/40 text-sm">
            © {new Date().getFullYear()} {profile.name}. Built with product thinking.
          </p>
          <div className="flex gap-6">
            {profile.links.tedTalk && (
              <a
                href={profile.links.tedTalk}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-light/40 hover:text-primary text-sm transition-colors"
              >
                TEDx Talk <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {profile.links.book && (
              <a
                href={profile.links.book}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-light/40 hover:text-primary text-sm transition-colors"
              >
                Book <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
