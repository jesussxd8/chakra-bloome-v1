'use strict';

const CACHE = 'chakra-v6';
const CORE = [
  './',
  './index.html',
  './styles.css?v=6.0.0',
  './i18n.js?v=6.0.0',
  './app.js?v=6.0.0',
  './manifest.webmanifest',
  './assets/img/logo-circle.webp',
  './assets/img/juice-board.webp',
  './assets/img/latte.webp',
  './assets/img/pancakes-savory.webp',
  './assets/img/toast-tricolor-horizontal.webp',
  './assets/img/favicon-64.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('.pdf')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) caches.open(CACHE).then(cache => cache.put('./index.html', response.clone()));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  const cacheable = ['style', 'script', 'image', 'manifest'].includes(request.destination);
  if (!cacheable) return;

  // Static assets: instant cache hit, with a background refresh when online.
  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if (response.ok) caches.open(CACHE).then(cache => cache.put(request, response.clone()));
        return response;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
