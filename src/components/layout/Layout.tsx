import { useEffect } from 'react'
import { Outlet, useLocation, useMatches } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export default function Layout() {
  const location = useLocation()
  const matches = useMatches()
  const isNotFound = matches.some(
    (m) =>
      m.route.path === '*' ||
      (m.params != null && Object.prototype.hasOwnProperty.call(m.params, '*'))
  )

  // Scroll to top when the route changes so every page loads from the top
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  // 404 + Tetris: full viewport, no chrome (catch-all route path is '*')
  if (isNotFound) {
    return (
      <div className="min-h-screen bg-dark text-light">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark text-light flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
