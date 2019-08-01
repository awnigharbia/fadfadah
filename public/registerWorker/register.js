importScripts('/cache-polyfill.js');
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('fadfada').then(function (cache) {
            return cache.addAll([
                '/',
                '../index.html'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});