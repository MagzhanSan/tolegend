// Service Worker для кэширования статических ресурсов
const CACHE_NAME = "tolegend-cache-v1";

// Ресурсы для предварительного кэширования
const PRECACHE_URLS = [
  "/",
  "/logo.webp",
  "/new-content/design/left.mp4",
  "/middle.mp4",
  "/new-content/events/right.mp4",
];

// Ресурсы для ленивого кэширования (при первом запросе)
const LAZY_CACHE_PATTERNS = [
  /\.webp$/,
  /\.mp4$/,
  /\.woff2?$/,
  /\/_next\/static\//,
];

// Установка Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Precaching critical resources");
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Активация и очистка старых кэшей
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Стратегия кэширования: Cache First для статики, Network First для остального
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Пропускаем не-GET запросы
  if (request.method !== "GET") return;

  // Пропускаем внешние запросы
  if (url.origin !== location.origin) return;

  // Проверяем, нужно ли кэшировать
  const shouldCache = LAZY_CACHE_PATTERNS.some((pattern) =>
    pattern.test(url.pathname)
  );

  if (shouldCache) {
    // Cache First для статических ресурсов
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Обновляем кэш в фоне
          fetch(request)
            .then((response) => {
              if (response.ok) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, response);
                });
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        // Если нет в кэше - загружаем и кэшируем
        return fetch(request).then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
  } else {
    // Network First для остального
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(request);
      })
    );
  }
});

// Обработка сообщений от клиента
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
