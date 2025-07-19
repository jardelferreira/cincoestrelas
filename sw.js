const CACHE_NAME = "pwa-tabela-v1";
const urlsToCache = [
    `/`,
    `https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/index.html`,
    'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/login.html',
    'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/register.html',
    `https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/manifest.json`,
    `https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/icon-192.png`,
    `https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/icon-512.png`,
    `https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/styles.css`,
    `https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/all.css`,
    `https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/spinner.png`,
    `https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/operacoes.js`,
    `https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/script.js`,
    'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/src/output.css'

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
