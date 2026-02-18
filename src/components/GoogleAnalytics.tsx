import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined

export function GoogleAnalytics() {
  const location = useLocation()

  // Load GA script and initialize when GA_ID is set
  useEffect(() => {
    if (!GA_ID) return

    // Load gtag.js
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, { send_page_view: false })
  }, [])

  // Send page_view on route change (SPA navigation)
  useEffect(() => {
    if (!GA_ID || !window.gtag) return

    window.gtag('config', GA_ID, {
      page_path: location.pathname + location.search,
    })
  }, [location.pathname, location.search])

  return null
}
