const CACHE_NAME = "pwa-tabela-v1";
const urlsToCache = [
  "https://jardelferreira.github.io/cincoestrelas/manifest.json",
  "https://jardelferreira.github.io/cincoestrelas/icon-192.png",
  "https://jardelferreira.github.io/cincoestrelas/icon-512.png",
  "https://jardelferreira.github.io/cincoestrelas/styles.css",
  "https://jardelferreira.github.io/cincoestrelas/spinner.png",
  "https://jardelferreira.github.io/cincoestrelas/operacoes.js",
  "https://jardelferreira.github.io/cincoestrelas/script.js",
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
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
