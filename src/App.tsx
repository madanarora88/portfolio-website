import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudies from './pages/CaseStudies'
import About from './pages/About'
import Writing from './pages/Writing'
import Speaking from './pages/Speaking'
import Contact from './pages/Contact'
import Layout from './components/layout/Layout'
import CommandPalette from './components/layout/CommandPalette'

const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'))
const AIExperiments = lazy(() => import('./pages/AIExperiments'))
const Simulator = lazy(() => import('./pages/Simulator'))

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route
            path="/case-studies/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <CaseStudyDetail />
              </Suspense>
            }
          />
          <Route
            path="/ai-experiments"
            element={
              <Suspense fallback={<PageLoader />}>
                <AIExperiments />
              </Suspense>
            }
          />
          <Route
            path="/simulator"
            element={
              <Suspense fallback={<PageLoader />}>
                <Simulator />
              </Suspense>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
      <CommandPalette />
    </Router>
  )
}

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default App
