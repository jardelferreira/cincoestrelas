const CACHE_NAME = "pwa-tabela-v1";
const urlsToCache = [
    `/`,
    `/index.html`,
    'login.html',
    '/register.html',
    `/manifest.json`,
    `/icon-192.png`,
    `/icon-512.png`,
    `/styles.css`,
    `/all.css`,
    `/spinner.png`,
    `/operacoes.js`,
    `/script.js`,
    `/webfonts/fa-brands-400.ttf`,
    `/webfonts/fa-brands-400.woff2`,
    `/webfonts/fa-regular-400.ttf`,
    `/webfonts/fa-regular-400.woff2`,
    `/webfonts/fa-solid-900.ttf`,
    `/webfonts/fa-solid-900.woff2`,
    `/webfonts/fa-v4compatibility.ttf`,
    `/webfonts/fa-v4compatibility.woff2`,
    '/src/output.css',

];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(resp => resp || fetch(event.request))
    );
});
