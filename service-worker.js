/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["README.md","73181756120c30427eee404d8d51cb0f"],["autre.txt","b7e418877a763a7f4f766155aedcd3f1"],["cookies.js","168aed503d95952b63ffd3696a386eaf"],["cookies/README.md","819716ee3d8a6ac9b1be91f92817da32"],["cookies/advertising.js","03b906458d104b03623e05f8b82be15f"],["cookies/cookies.js","c56a5ea3fef7caec32403eebcbb0fc9c"],["cookies/cookies.services.js","162117f96b9844f1266f03f699deb631"],["cookies/css/cookies.css","afad2b4bf073e0edf00cbc0cf51f0dff"],["cookies/lang/cookies.cs.js","91c0fcf30e4ee67e48459390c0ed2436"],["cookies/lang/cookies.de.js","3a2ea4d23d318f0172f40091d482c778"],["cookies/lang/cookies.en.js","c80fa2fc65f346f07e9bd7fba7defa8f"],["cookies/lang/cookies.es.js","384c429db49d315a2e2150613d09f501"],["cookies/lang/cookies.fr.js","0891896b16219b6f1af42e954706f100"],["cookies/lang/cookies.it.js","749eb8d23021ac0db4a0923bc11ad663"],["cookies/lang/cookies.nl.js","2f8bf6699b0b48c40e09250d263385ac"],["cookies/lang/cookies.pl.js","198815d1ee4ca9e880df339693f12e82"],["cookies/lang/cookies.pt.js","0e48bf0f7a225bd038217705e39b26ca"],["cookies/lang/cookies.ru.js","22202b8af931b27905a0637305766783"],["img/HHhH.jpg","d59012e8503e0e6af26fba3aae27d4dc"],["img/Survivestyle5-2004-comedie.jpg","0577b93654886419df9ca9aa3e5eb5f3"],["img/Thumbs.db","5ae09ddd18b8eaa0cb9f07537d0af0e2"],["img/WhatWeDoInTheShadows-2014-comedie.jpg","1bd64d0f8c424193a9d5dbc687d2dea4"],["img/animaux-fantastiques.jpg","ee676582c17cb8fd0b9acac937a48b0e"],["img/baby-sitting.jpg","fd686523235ad26647157108cd46689a"],["img/batmanmovie-2017-comedie.jpg","f500614ad3574ea531c9e8a20f5523e2"],["img/beau-la-vie.jpg","1145364d0b77ffe873536179b3d05fc4"],["img/bienvenue-chtis.jpg","d323d1d24d00585b64f26c062e8426b1"],["img/churchill.jpg","8190441550456a301bf138e9ac6a2aa4"],["img/conspiracy.jpg","b25b6f10a2048fe8111a5d0935c18ea7"],["img/cornouaille.jpg","52dfcf926ed1d340f74cf5801fe89283"],["img/deja-tes-yeux.jpg","190b9f4d85d4b8bad314edc23f83d5e1"],["img/dernier-loup.jpg","2ab41b250fbfea9a12f6de8b9d583973"],["img/homesman.jpg","df54039b6ff2c40e9e9f6e920144ad76"],["img/hostel-2005-thriller.jpg","fe2d26fd855a3fc64352ce5c4d35bf06"],["img/inception-2010-scifi.jpg","2f367b15507f6938a57765991bc33949"],["img/intouchables-2011-comedie.jpg","ef1bd465346d1aa2e3be999720d15226"],["img/ironMan.jpeg","07d2657c6c4f549b2dca63e5bfb0c437"],["img/ironMan2.jpeg","1e21e49528e35eb9d2b63e422342a2be"],["img/ironMan3.jpeg","95ab9b67eb96a0f718b923ff87b1eb1e"],["img/isola.jpg","9ac5d6153da91023615f7540b1d8d1b5"],["img/jason-bourre.jpg","aedde7ebb35c91d2d80cfe5d7250f682"],["img/jurassicPark.jpeg","7c86d90c32e5943a179b56fe177e6947"],["img/jurassicPark2.jpg","11cb681584e280ad69b8829bdecea51c"],["img/lehobbit.jpg","5cd712df5a9351771a89daeae00fcbe6"],["img/lepatientanglais-1996-dramatique.jpg","388096519d756894eeff4853ee36d5a4"],["img/lesdeuxtours-2002-aventure.jpg","70a93fadd64024cc19823202186dc3b1"],["img/peter-elliott.jpeg","a1539690470fad79f4cac48904d9a7ff"],["img/poster1.jpg","ed7e53c9b63af171afc58262a0cdc200"],["img/poster2.png","402caa23a82fde23093533f77284ddbe"],["img/poster3.jpg","50c04ef269dfb39dbb49f9323579b842"],["img/rage-au-ventre.jpg","0c1283d4e44cf42a3514ffa01f4be738"],["img/rezort.jpg","3ddb36be68e77e2c987ac4fe450cb231"],["img/seven-1995-thriller.jpg","c327ade356c3dda4bca1eb653b84d682"],["img/shutterisland-2010-thriller.jpg","0cf8822af62289cc261e2d37fa4ac857"],["img/spyKids.jpeg","e193a2336813113f5bed71ed20b53a9b"],["img/spyKids2.jpeg","3e41d672d9fda3ee05c83f07405ab895"],["img/spyKids3D.jpeg","0af07191c9fa0205f733c1103a4616e8"],["img/spyKids4D.jpeg","67957f87a50a7570e7754f3f7a4dba44"],["img/starwarsempire-1980-scifi.jpg","6a6c65cfdf4d6b42258840e7fbd7b211"],["img/swissarmyman-2016-comedie.jpg","d3cfcea6633f0543b5a75bc8737d33b6"],["img/taken3.jpg","a5ca0f7c7ec92e0fbba0a5c1c56dab19"],["img/thefall-2006-dramatique.jpg","bbc700e4f0c9d3fe9560ed8cadf0277b"],["img/timbuktu.jpg","ab0d68e665f409bae7e2d804ee3c675b"],["img/un-sac-de-billes.jpg","379d9f7cded4d483efafb96c4f43ce52"],["img/wonderwoman.jpg","f3acae1dc36bcaa04341bb1dbfcbc545"],["img/zoolander-2001-comedie.jpg","14fdef0e95ee53aeaad0d8d38b0f99c4"],["index.html","29581326bbb5e446432b0135394e6dc1"],["manifest.json","76da97cd0fb4193c83ed0ad47d97a016"],["modal.js","3d0a482eb919cc07cbe5c8bb58268db8"],["myShop.css","fadfe0ffbcc128cb9c33b6d69dce8cb2"],["myShop.js","a7d6fd6afc6f90f645e81d31ece7f357"],["newsletter.html","27b36c427b5ae0dc4b14005fbf332105"],["script.js","caf43cdd441297640bbbf736e05a9935"],["snippet.js","01a17e4823ef53951bc1c043b404f659"],["style.css","9822d34360b075a03e41f997f31c38db"],["tableau-tri.css","eb9065cac90e7ad0b4b8b8facc94d84e"],["tableau-tri.js","b25d36a3d2ae6316a41fa05fc72c02b3"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







