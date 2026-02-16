import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Command } from 'lucide-react'
import { useCommandPaletteStore } from '../../stores/commandPaletteStore'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/ai-experiments', label: 'AI Experiments' },
  { to: '/simulator', label: 'Think' },
  { to: '/writing', label: 'Writing' },
  { to: '/about', label: 'About' },
  { to: '/speaking', label: 'Speaking' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const openCommandPalette = useCommandPaletteStore((s) => s.open)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-light/5">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-light hover:text-primary transition-colors"
        >
          Madan Arora
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-light/70 hover:text-light font-medium text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={openCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-light/5 hover:bg-light/10 border border-light/10 text-light/70 hover:text-light text-sm transition-all"
          >
            <Command className="w-4 h-4" />
            <span>⌘K</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-light hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-light/5"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-light/70 hover:text-light font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  openCommandPalette()
                  setMobileMenuOpen(false)
                }}
                className="flex items-center gap-2 py-2 text-light/70 hover:text-light font-medium"
              >
                <Command className="w-4 h-4" />
                Search (⌘K)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
