const CACHE = "cache-and-update";

const onOpen = cb => caches.open(CACHE).then(cb);

const preCache = () => onOpen(cache => cache.addAll([
    "./images",
    "./js",
    "./favicon.ico",
    "./index.html",
    "./manifest.webmanifest",
]));

const fromCache = request => onOpen(
    cache => cache.match(request).then(
        matching => matching || Promise.reject("no-match")
    )
);

const toCache = request => onOpen(
    cache => fetch(request).then(
        response => cache.put(request, response)
    )
);

self.addEventListener("install", evt => {
    evt.waitUntil(preCache());
});

self.addEventListener("fetch", evt => {
    const { request } = evt;
    evt.respondWith(fromCache(request));
    evt.waitUntil(toCache(request));
});
