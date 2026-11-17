/* ============================================================
   Abokor Tech Portfolio — Service Worker v5.1.0
   Caches core assets for offline / faster repeat visits.
   ============================================================ */

const CACHE_NAME = 'abokor-tech-v5-2-0';

const CORE_ASSETS = [
  './',
  './index.html',
  './so/',
  './en/',
  './cv.html',
  './privacy.html',
  './terms.html',
  './404.html',
  './style.css?v=5.0.0',
  './legal.css?v=1.0.6',
  './app.js?v=5.1.0',
  './manifest.webmanifest',
  './hr.png',
  './preview_hero.png',
  './sms.png',
  './icon-192.png',
  './icon-512.png',
  './Abokor_Keyse_CV.pdf'
];

// Install: pre-cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first for same-origin GET, network fallback, runtime caching
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Skip non-http(s) and cross-origin requests except same-origin assets
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // Cache successful same-origin responses for offline use
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback: serve cached index for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('./index.html')
              .then((fallback) => fallback || caches.match(new URL('./index.html', self.location).href));
          }
        });
    })
  );
});
