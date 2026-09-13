import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'portfolio-theme'
export type ThemeId = 'default' | 'cream' | 'mint'

const ThemeContext = createContext<{
  theme: ThemeId
  setTheme: (t: ThemeId) => void
} | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('default')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null
    if (stored === 'cream' || stored === 'mint' || stored === 'default') {
      setThemeState(stored)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme, mounted])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    return { theme: 'default' as ThemeId, setTheme: () => {} }
  }
  return ctx
}
