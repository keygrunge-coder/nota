// sw.js
const CACHE_NAME = 'nota-app-v1';
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    return cache.addAll(['/index.html', '/css/style.css', '/js/main.js']);
  }));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
