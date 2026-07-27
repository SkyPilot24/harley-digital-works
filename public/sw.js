const CACHE_NAME = "harley-digital-works-cache-v2";
const OFFLINE_URL = "/offline.html";

const PRECACHE_ASSETS = [
  "/",
  "/brand/approved/icons/favicon-32.png",
  "/brand/approved/icons/favicon-16.png",
  "/site.webmanifest",
  OFFLINE_URL,
];

// Helper to determine if a request should be ignored by the Service Worker cache
function shouldBypassCache(request) {
  const url = new URL(request.url);

  // Caching only GET requests
  if (request.method !== "GET") {
    return true;
  }

  // Bypass if request is to external domain
  if (url.origin !== self.location.origin) {
    return true;
  }

  // Bypass TanStack Start server functions, Auth endpoints, and hot reloading endpoints
  if (
    url.pathname.startsWith("/_server-fn") ||
    url.pathname.startsWith("/auth") ||
    url.pathname.includes("/admin") ||
    url.pathname.includes("hot-update")
  ) {
    return true;
  }

  return false;
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Warm up cache with essential shell assets
      return cache.addAll(PRECACHE_ASSETS);
    }),
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old versions of caches
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Deleting obsolete cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  // Tell the active service worker to take control of all open clients immediately
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (shouldBypassCache(event.request)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached asset immediately
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // Check for a valid response to cache
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          // Don't cache dynamic index document requests (which might include fresh database SSR content)
          // Just cache static assets like JS, CSS, images, Web Fonts
          const url = new URL(event.request.url);
          const isStaticAsset =
            url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|webp|woff2|woff|ttf|ico)$/) ||
            url.pathname.startsWith("/_build") ||
            url.pathname.startsWith("/assets");

          if (isStaticAsset) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return networkResponse;
        })
        .catch(() => {
          // If network fetch fails, handle HTML page fallbacks
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
        });
    }),
  );
});
