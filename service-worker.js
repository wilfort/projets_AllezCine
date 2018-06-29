var CACHENAME = 'my-site-step-v1';
var dataCacheName = 'my-site-v1';
var urlsToCache = [
  '/projets_AllezCine/',
  '/projets_AllezCine/index.html',
  '/projets_AllezCine/newsletter.html',
  '/projets_AllezCine/style.css',
  '/projets_AllezCine/tableau-tri.css',
  '/projets_AllezCine/myShop.css',
  '/projets_AllezCine/img/animaux-fantastiques.jpg',
  '/projets_AllezCine/img/baby-sitting.jpg',
  '/projets_AllezCine/img/batmanmovie-2017-comedie.jpg',
  '/projets_AllezCine/img/beau-la-vie.jpg',
  '/projets_AllezCine/img/bienvenue-chtis.jpg',
  '/projets_AllezCine/img/churchill.jpg',
  '/projets_AllezCine/img/conspiracy.jpg',
  '/projets_AllezCine/img/cornouaille.jpg',
  '/projets_AllezCine/img/deja-tes-yeux.jpg',
  '/projets_AllezCine/img/dernier-loup.jpg',
  '/projets_AllezCine/img/HHhH.jpg',
  '/projets_AllezCine/img/homesman.jpg',
  '/projets_AllezCine/img/hostel-2005-thriller.jpg',
  '/projets_AllezCine/img/inception-2010-scifi.jpg',
  '/projets_AllezCine/img/intouchables-2011-comedie.jpg',
  '/projets_AllezCine/img/ironMan.jpeg',
  '/projets_AllezCine/img/ironMan2.jpeg',
  '/projets_AllezCine/img/ironMan3.jpeg',
  '/projets_AllezCine/img/isola.jpg',
  '/projets_AllezCine/img/jason-bourre.jpg',
  '/projets_AllezCine/img/jurassicPark.jpeg',
  '/projets_AllezCine/img/jurassicPark2.jpg',
  '/projets_AllezCine/img/lehobbit.jpg',
  '/projets_AllezCine/img/lepatientanglais-1996-dramatique.jpg',
  '/projets_AllezCine/img/lesdeuxtours-2002-aventure.jpg',
  '/projets_AllezCine/img/peter-elliott.jpeg',
  '/projets_AllezCine/img/poster1.jpg',
  '/projets_AllezCine/img/poster2.png',
  '/projets_AllezCine/img/poster3.jpg',
  '/projets_AllezCine/img/rage-au-ventre.jpg',
  '/projets_AllezCine/img/rezort.jpg',
  '/projets_AllezCine/img/seven-1995-thriller.jpg',
  '/projets_AllezCine/img/shutterisland-2010-thriller.jpg',
  '/projets_AllezCine/img/spyKids.jpeg',
  '/projets_AllezCine/img/spyKids2.jpeg',
  '/projets_AllezCine/img/spyKids3D.jpeg',
  '/projets_AllezCine/img/spyKids4D.jpeg',
  '/projets_AllezCine/img/starwarsempire-1980-scifi.jpg',
  '/projets_AllezCine/img/Survivestyle5-2004-comedie.jpg',
  '/projets_AllezCine/img/swissarmyman-2016-comedie.jpg',
  '/projets_AllezCine/img/taken3.jpg',
  '/projets_AllezCine/img/thefall-2006-dramatique.jpg',
  '/projets_AllezCine/img/timbuktu.jpg',
  '/projets_AllezCine/img/un-sac-de-billes.jpg',
  '/projets_AllezCine/img/WhatWeDoInTheShadows-2014-comedie.jpg',
  '/projets_AllezCine/img/wonderwoman.jpg',
  '/projets_AllezCine/img/zoolander-2001-comedie.jpg',

  '/projets_AllezCine/snippet.js',
  '/projets_AllezCine/tableau-tri.js',
  '/projets_AllezCine/myShop.js',
  '/projets_AllezCine/modal.js',
  '/projets_AllezCine/cookies.js',

  '/projets_AllezCine/img/.png',
  '/projets_AllezCine/img/.png',
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

];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(CACHENAME).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHENAME && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
}); 
/*self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});*/

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
/*
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        function (response) {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function (cache) {
              cache.put(event.request, responseToCache);
            });
          return fetch(event.request);
        }
      );
    })
  );
});

self.addEventListener('activate', function (event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
fetch(url, {
  credentials: 'include'
})
cache.addAll(urlsToPrefetch.map(function (urlToPrefetch) {
  return new Request(urlToPrefetch, {
    mode: 'no-cors'
  });
})).then(function () {
  console.log('All resources have been fetched and cached.');
});*/