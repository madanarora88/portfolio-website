const CACHE_NAME = 'madan-portfolio-v1'
const OFFLINE_URL = '/offline.html'

// Files to cache for offline use
const CACHE_URLS = [
  '/',
  '/offline.html',
  '/case-studies',
  '/about',
  '/contact',
  '/writing',
  '/speaking',
  '/ai-experiments',
  '/simulator',
]

// Install service worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...')
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache offline.html first - critical for offline experience
      return cache.add('/offline.html').then(() => {
        return Promise.allSettled(
          CACHE_URLS.filter(url => url !== '/offline.html').map(url => cache.add(url))
        )
      })
    })
  )
  self.skipWaiting()
})

// Activate service worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch strategy: Network first, fallback to cache, then offline page
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return

  // Skip chrome extensions and non-http requests
  if (!event.request.url.startsWith('http')) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseToCache = response.clone()

        // Update cache with new response
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
      .catch(() => {
        // Network failed (offline or server down)
        // For navigation requests, always serve offline.html - the SPA won't work
        // without JS assets anyway, and we want the fun offline experience
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL).then((response) => {
            if (response) return response
            return new Response(
              '<h1>Offline</h1><p>Please check your connection and try again.</p>',
              { headers: { 'Content-Type': 'text/html' } }
            )
          })
        }

        // For other requests (JS, CSS, images), try cache
        return caches.match(event.request).then((response) => {
          if (response) return response
          return new Response('Offline - Content not cached', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain' }),
          })
        })
      })
  )
})

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
