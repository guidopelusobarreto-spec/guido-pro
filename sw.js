const CACHE_NAME = 'guidopro-v32';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(['/'])));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(r => r || fetch(event.request).then(res => {
    const clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put(event.request,clone));return res;
  }).catch(()=>caches.match('/'))));
});
