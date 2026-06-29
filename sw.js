const CACHE_NAME = "9m2pju-smith-chart-v1";
const APP_SHELL = ["/", "/manifest.webmanifest", "/favicon.svg", "/icons/icon-192.png", "/icons/icon-512.png", "/icons/icon-maskable-512.png"];

const sw = globalThis;

sw.addEventListener("install", (event) => {
  event.waitUntil(sw.caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  sw.skipWaiting();
});

sw.addEventListener("activate", (event) => {
  event.waitUntil(
    sw.caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => sw.caches.delete(key))))
      .then(() => sw.clients.claim()),
  );
});

sw.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== sw.location.origin) return;

  event.respondWith(
    sw.caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") return response;

        const responseClone = response.clone();
        sw.caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        return response;
      });
    }),
  );
});
