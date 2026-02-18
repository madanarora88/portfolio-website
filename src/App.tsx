import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Home from './pages/Home'
import CaseStudies from './pages/CaseStudies'
import Layout from './components/layout/Layout'
import CommandPalette from './components/layout/CommandPalette'

const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'))
const AIExperiments = lazy(() => import('./pages/AIExperiments'))
const Simulator = lazy(() => import('./pages/Simulator'))
const About = lazy(() => import('./pages/About'))
const Writing = lazy(() => import('./pages/Writing'))
const Speaking = lazy(() => import('./pages/Speaking'))
const Contact = lazy(() => import('./pages/Contact'))

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
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/writing"
            element={
              <Suspense fallback={<PageLoader />}>
                <Writing />
              </Suspense>
            }
          />
          <Route
            path="/speaking"
            element={
              <Suspense fallback={<PageLoader />}>
                <Speaking />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <CommandPalette />
      <Analytics />
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
