const CACHE_NAME = 'landing-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/styles.critical.css',
  '/sprite.svg',
  '/js/vitals.js',
  '/js/lazy.sections.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.destination === 'image' || 
      event.request.destination === 'style' || 
      event.request.destination === 'font' ||
      event.request.destination === 'script') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
          return networkResponse;
        }).catch(() => cached);
      })
    );
  } else {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
  }
});
