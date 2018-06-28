var cacheName = 'weatherPWA-step-6-1';
var dataCacheName = 'Syn-d-Loc';
var urlsToCache = [
  '/projets_AllezCine/index.html',
  '/projets_AllezCine/newsletter.html',
  '/projets_AllezCine/style.css',
  '/projets_AllezCine/tableau-tri.css',
  '/projets_AllezCine/myShop.css',
  '/projets_AllezCine/snippet.js',
  '/projets_AllezCine/tableau-tri.js',
  '/projets_AllezCine/script.js',
  '/projets_AllezCine/myShop.js',
  '/projets_AllezCine/modal.js',
  '/projets_AllezCine/cookies.js',
  '/projets_AllezCine/cookies/css/cookies.css',
  '/projets_AllezCine/cookies/lang/cookies.cs.js',
  '/projets_AllezCine/cookies/lang/cookies.de.js',
  '/projets_AllezCine/cookies/lang/cookies.en.js',
  '/projets_AllezCine/cookies/lang/cookies.es.js',
  '/projets_AllezCine/cookies/lang/cookies.fr.js',
  '/projets_AllezCine/cookies/lang/cookies.it.js',
  '/projets_AllezCine/cookies/lang/cookies.nl.js',
  '/projets_AllezCine/cookies/lang/cookies.pl.js',
  '/projets_AllezCine/cookies/lang/cookies.pt.js',
  '/projets_AllezCine/cookies/lang/cookies.ru.js',
  '/projets_AllezCine/cookies/advertising.js',
  '/projets_AllezCine/cookies/cookies.js',
  '/projets_AllezCine/cookies/cookies.services.js',
  '/projets_AllezCine/cookies/LICENSE'
//   ,
//   '/projets_AllezCine/img/',
//   '/projets_AllezCine/img/',
//   '/projets_AllezCine/img/',
//   '/projets_AllezCine/img/',
//   '/projets_AllezCine/'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
    );
  });

// self.addEventListener('activate', function(e) {
//     console.log('[ServiceWorker] Activate');
//     e.waitUntil(
//       caches.keys().then(function(keyList) {
//         return Promise.all(keyList.map(function(key) {
//           if (key !== cacheName && key !== dataCacheName) {
//             console.log('[ServiceWorker] Removing old cache', key);
//             return caches.delete(key);
//           }
//         }));
//       })
//     );
//     return self.clients.claim();
//   }); 
//   self.addEventListener('fetch', function(e) {
//     console.log('[ServiceWorker] Fetch', e.request.url);
//     e.respondWith(
//       caches.match(e.request).then(function(response) {
//         return response || fetch(e.request);
//       })
//     );
//   });
  
//   self.addEventListener('fetch', function(e) {
//     console.log('[Service Worker] Fetch', e.request.url);
//     var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
//     if (e.request.url.indexOf(dataUrl) > -1) {
//       /*
//        * When the request URL contains dataUrl, the app is asking for fresh
//        * weather data. In this case, the service worker always goes to the
//        * network and then caches the response. This is called the "Cache then
//        * network" strategy:
//        * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
//        */
//       e.respondWith(
//         caches.open(dataCacheName).then(function(cache) {
//           return fetch(e.request).then(function(response){
//             cache.put(e.request.url, response.clone());
//             return response;
//           });
//         })
//       );
//     } else {
//       /*
//        * The app is asking for app shell files. In this scenario the app uses the
//        * "Cache, falling back to the network" offline strategy:
//        * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
//        */
//       e.respondWith(
//         caches.match(e.request).then(function(response) {
//           return response || fetch(e.request);
//         })
//       );
//     }
//   });