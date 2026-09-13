import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useCommandPaletteStore } from '../../stores/commandPaletteStore'
import { useAskAIStore } from '../../stores/askAIStore'
import { useTheme, type ThemeId } from '../../contexts/ThemeContext'

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

const THEMES: { id: ThemeId; label: string }[] = [
  { id: 'default', label: 'Default' },
  { id: 'cream', label: 'Cream' },
  { id: 'mint', label: 'Mint' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const openCommandPalette = useCommandPaletteStore((s) => s.open)
  const openAskAI = useAskAIStore((s) => s.open)
  const { theme, setTheme } = useTheme()

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
        <div className="hidden md:flex items-center gap-6">
          {/* Theme switcher — Pick a vibe (P1) */}
          <div className="relative">
            <button
              onClick={() => setThemeOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-light/10 hover:border-light/20 text-light/70 hover:text-light text-sm transition-colors"
              aria-label="Pick a vibe"
            >
              Pick a vibe <ChevronDown className={`w-4 h-4 transition-transform ${themeOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {themeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full left-0 mt-1 py-1 rounded-lg bg-dark border border-light/10 shadow-xl z-50 min-w-[120px]"
                >
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id)
                        setThemeOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-light/10 ${theme === t.id ? 'text-primary font-medium' : 'text-light/80'}`}
                    >
                      {t.label} {theme === t.id ? '✓' : ''}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
            aria-label="Search (⌘K)"
            className="px-3 py-1.5 rounded-lg bg-light/5 hover:bg-light/10 border border-light/10 text-light/70 hover:text-light text-sm transition-all font-medium"
          >
            ⌘K
          </button>
          <button
            onClick={openAskAI}
            aria-label="Ask AI (⌘I)"
            className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary text-sm transition-all font-medium"
          >
            ⌘I
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
                className="py-2 text-light/70 hover:text-light font-medium"
              >
                Search (⌘K)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
