import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCommandPaletteStore } from '../../stores/commandPaletteStore'
import {
  Home,
  FileText,
  FlaskConical,
  PenLine,
  User,
  Mail,
  Command,
  Mic,
} from 'lucide-react'

const commands = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/case-studies', label: 'Case Studies', icon: FileText },
  { path: '/ai-experiments', label: 'AI Experiments', icon: FlaskConical },
  { path: '/simulator', label: 'Think Like a PM', icon: Command },
  { path: '/writing', label: 'Writing', icon: PenLine },
  { path: '/about', label: 'About', icon: User },
  { path: '/speaking', label: 'Speaking', icon: Mic },
  { path: '/contact', label: 'Contact', icon: Mail },
]

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  let qi = 0
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++
  }
  return qi === q.length
}

export default function CommandPalette() {
  const { isOpen, close } = useCommandPaletteStore()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredCommands = query.trim()
    ? commands.filter((c) => fuzzyMatch(query, c.label))
    : commands

  const selectCommand = useCallback(
    (cmd: (typeof commands)[0]) => {
      navigate(cmd.path)
      close()
      setQuery('')
      setSelectedIndex(0)
    },
    [navigate, close]
  )

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => (i + 1) % filteredCommands.length)
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + filteredCommands.length) % filteredCommands.length)
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          selectCommand(filteredCommands[selectedIndex])
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close, filteredCommands, selectedIndex, selectCommand])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        useCommandPaletteStore.getState().toggle()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) setSelectedIndex(0)
  }, [isOpen, query])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 z-[101] w-full max-w-xl"
          >
            <div className="mx-4 rounded-xl border border-light/10 bg-dark shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-light/10">
                <Command className="w-5 h-5 text-light/50" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search or jump to..."
                  className="flex-1 bg-transparent text-light placeholder:text-light/40 outline-none text-lg"
                  autoFocus
                />
                <kbd className="hidden sm:inline text-xs text-light/40 px-2 py-1 rounded bg-light/5">
                  ESC
                </kbd>
              </div>
              <div className="max-h-80 overflow-y-auto py-2">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-light/50">
                    No results found
                  </div>
                ) : (
                  filteredCommands.map((cmd, i) => {
                    const Icon = cmd.icon
                    return (
                      <button
                        key={cmd.path}
                        onClick={() => selectCommand(cmd)}
                        onMouseEnter={() => setSelectedIndex(i)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          i === selectedIndex ? 'bg-primary/20 text-primary' : 'text-light/80 hover:bg-light/5'
                        }`}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        <span className="font-medium">{cmd.label}</span>
                      </button>
                    )
                  })
                )}
              </div>
              <div className="px-4 py-2 border-t border-light/5 flex items-center justify-between text-xs text-light/40">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
