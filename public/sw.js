// Mirokaï PWA service worker — offline + background sync foundation.
const VERSION = "v19";
const STATIC_CACHE = `mirokai-static-${VERSION}`;
const RUNTIME_CACHE = `mirokai-runtime-${VERSION}`;

const CORE_ASSETS = [
  "/",
  "/choose",
  "/story",
  "/welcome",
  "/quests",
  "/chapitre-1",
  "/mission-1",
  "/validation-1",
  "/quests-2",
  "/chapitre-2",
  "/mission-2",
  "/validation-2",
  "/quests-3",
  "/chapitre-3",
  "/images/chapter3-hero.jpg",
  "/mission-3",
  "/images/miroji-question.png",
  "/images/puzzle-p1.png",
  "/images/puzzle-p2.png",
  "/images/puzzle-p3.png",
  "/images/puzzle-p4.png",
  "/images/puzzle-p5.png",
  "/images/puzzle-p6.png",
  "/validation-3",
  "/images/robot-arms.png",
  "/images/magic-ring.png",
  "/quests-4",
  "/chapitre-4",
  "/images/chapter4-hero.jpg",
  "/mission-4",
  "/images/miroji-q4.png",
  "/images/glyph-m.svg",
  "/images/glyph-i.svg",
  "/images/glyph-r.svg",
  "/images/glyph-o.svg",
  "/images/glyph-k.svg",
  "/images/glyph-a.svg",
  "/indice-4",
  "/images/tableau-mirokai.png",
  "/validation-4",
  "/images/buste-robot.png",
  "/images/magic-ring4.png",
  "/final",
  "/images/mirokai-complet.png",
  "/images/magic-ring-final.png",
  "/images/mission-card-bg.jpg",
  "/manifest.webmanifest",
  "/images/stars.png",
  "/images/duo-poster.png",
  "/images/logo-mirokai-experience.png",
  "/images/miroka.png",
  "/images/miroki.png",
  "/images/logo-miroka.png",
  "/images/logo-miroki.png",
  "/images/miroka-avatar.png",
  "/images/miroka-profile.png",
  "/images/magic-ring.png",
  "/images/schema-visage.png",
  "/images/schema-oreilles.png",
  "/images/schema-yeux.png",
  "/images/quest-humans.jpg",
  "/images/quest-deplacement.jpg",
  "/images/quest-parole.jpg",
  "/images/quest-mission.jpg",
  "/images/chapter1-hero.jpg",
  "/images/faces-a.png",
  "/images/faces-b.png",
  "/images/faces-c.png",
  "/images/miroji-question.png",
  "/images/robot-head.png",
  "/images/robot-head-only.png",
  "/images/chapter2-hero.jpg",
  "/images/miroji-thinking.png",
  "/images/robot-legs.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => ![STATIC_CACHE, RUNTIME_CACHE].includes(k))
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((r) => r ?? caches.match("/"))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() => cached);
    }),
  );
});

self.addEventListener("push", (event) => {
  let payload = { title: "Mirokaï", body: "Une nouvelle aventure t'attend." };
  try {
    if (event.data) payload = { ...payload, ...event.data.json() };
  } catch (_) {
    // keep defaults
  }
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: payload.url ?? "/",
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data || "/";
  event.waitUntil(self.clients.openWindow(target));
});

self.addEventListener("sync", (event) => {
  if (event.tag === "mirokai-sync") {
    event.waitUntil(Promise.resolve());
  }
});
