import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Sends page_view to GA4 on SPA route changes.
 * The Google tag script is loaded in index.html.
 */
export function GoogleAnalytics() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.gtag !== 'function') return

    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_title: document.title,
    })
  }, [location.pathname, location.search])

  return null
}
