const CACHE_NAME = "pwa-tabela-v2";
const urlsToCache = [
  'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/index.html',
  'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/login.html',
  'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/register.html',
  'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/manifest.json',
  'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/icon-192.png',
  'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/icon-512.png',
  'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/styles.css',
  'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/all.css',
  'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/spinner.png',
  'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/operacoes.js',
  'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/script.js',
  'https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/src/output.css',
];

// INSTALAÇÃO — cache dos arquivos essenciais
self.addEventListener("install", event => {
  console.log("🛠️ Instalando service worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        urlsToCache.map(url =>
          fetch(url).then(response => {
            if (!response.ok) throw new Error(`Erro ao buscar ${url}`);
            return cache.put(url, response.clone());
          }).catch(err => {
            console.warn(`⚠️ Falha ao cachear ${url}:`, err.message);
          })
        )
      );
    })
  );
});

// ATIVAÇÃO — limpa caches antigos
self.addEventListener("activate", event => {
  console.log("✅ Service worker ativado");
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Removendo cache antigo:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH — responde com cache ou rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Fallback offline para arquivos HTML
          if (event.request.destination === 'document') {
            return caches.match('https://cdn.jsdelivr.net/gh/jardelferreira/cincoestrelas@main/index.html');
          }
        })
      );
    })
  );
});
