const staticCacheName = 'site-static-v15';
const assets = [
    './',
    './index.html',
    './manifest.json',
    './research.html',
    './about.html',
    './style.css',
    './pages.css',
    './research.css',
    './assets/arushi_cv.pdf',
    './assets/img/arushi-mark.svg',
    './assets/img/arushi-pattern.svg',
    './assets/img/automation-card.svg',
    './assets/img/dashboard-card.svg',
    './assets/img/migration-card.svg',
    './assets/img/analytics-card.svg',
    './assets/img/profile-card.svg',
    './assets/img/community-card.svg',
    'https://fonts.googleapis.com/css?family=Lato:300,400,700'
];
// install event
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
    self.skipWaiting();
});
// activate event
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});
// When we change the name we could have multiple cache, to avoid that we need to delet the old cache, so with this function we check the key that is our cache naming, if it is different from the actual naming we delete it, in this way we will always have only the last updated cache.
// fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});
