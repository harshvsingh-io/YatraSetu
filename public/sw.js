// YatraSetu Offline PWA Service Worker (v1)
const CACHE_NAME = "yatrasetu-cache-v1";
const OFFLINE_URLS = [
  "/",
  "/offline-pass",
  "/manifest.json",
];

// Install: Cache offline essentials
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS).catch((err) => {
        console.warn("ServiceWorker pre-cache note:", err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old cache versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Network first with Cache fallback for seamless zero-connectivity pass access
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Exclude API requests and Supabase auth calls from SW cache
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/auth/")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          (url.pathname === "/offline-pass" || url.pathname === "/" || url.pathname.endsWith(".js") || url.pathname.endsWith(".css"))
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        // Fallback to cache when offline
        const cached = await caches.match(event.request);
        if (cached) return cached;

        // If navigating to a page while offline, serve offline travel pass
        if (event.request.mode === "navigate") {
          const offlinePass = await caches.match("/offline-pass");
          if (offlinePass) return offlinePass;
        }

        return new Response("Offline - Please connect to network or visit /offline-pass", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        });
      })
  );
});
