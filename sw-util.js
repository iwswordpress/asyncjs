function installSW(event) {
   console.log(`SW Version ${version} installed.`);
}

function loadPrecache(event) {
   console.log('[SW] Service worker installed.');
   event.waitUntil(
      // waits until all done before install event is deemed to have finished
      caches
         .open(staticLocalCacheName)
         .then(function (cache) {
            //console.log('+++ caching APP SHELL assets +++');
            cache.addAll(localAssets);
         })
         .then(
            caches.open(staticRemoteCacheName).then(function (cache) {
               // we split local and remote preCache in case there are issues with other servers etc
               // if one failed all fail.
               //console.log('+++ caching REMOTE assets +++');
               cache.addAll(remoteAssets);
            }),
         )
         .then(self.skipWaiting()) // forces installation of new sw
         .catch(function (error) {
            console.log(error);
         }),
   );
}
function activateSW(event) {
   console.log('+++ service worker activation +++');
   console.log('[Service Worker] Activating Service Worker  ' + version + ' ....', event);

   // ++++++++++++++++
   // clear old caches
   // ++++++++++++++++
   event.waitUntil(
      caches.keys().then(function (cacheList) {
         console.log('!!! Clearing old caches');
         console.log('Caches: ', cacheList);
         // remove previous version caches where current version != current version
         return Promise.all(
            cacheList.map(function (cacheName) {
               console.log('------------------------');
               console.log('Name of Cache: ' + cacheName); // versions of cache
               if (cacheName !== staticLocalCacheName && cacheName !== staticRemoteCacheName && cacheName !== dynamicCacheName) {
                  console.log(`[Service Worker] Current cache V${version} - Removing old cache ${cacheName}`);
                  return caches.delete(cacheName);
               }
            }),
         );
      }),
   );
   return self.clients.claim();

   // with skipWaiting ensures all tabs/pages have new sw
   //The claim() method of the Clients allows an active service worker to set itself as the controller for all clients within its scope. This triggers a "controllerchange" event on navigator.serviceWorker in any clients that become controlled by this service worker.

   //When a service worker is initially registered, pages won't use it until they next load. The claim() method causes those pages to be controlled immediately. Be aware that this results in your service worker controlling pages that loaded regularly over the network, or possibly via a different service worker.
}

// limit number of entries in a cache
const limitCacheSize = (nameOfCache, numberOfEntries) => {
   caches.open(nameOfCache).then(cache => {
      cache.keys().then(cacheName => {
         console.log('limitCacheSize FN: cacheName.length = ' + cacheName.length);
         if (cacheName.length >= numberOfEntries) {
            //delete oldest (first) entry
            cache.delete(cacheName[0]).then(limitCacheSize(nameOfCache, numberOfEntries));
         }
      });
   });
};

// once loaded we uncomment below and the browser will detect a change
// it will install the SW again but keep in waiting
// once we skipWaiting etc, then the second activate will fire.
function swFetch(event) {
   const showFetch = false;
   if (showFetch) {
      console.log('-------------------------');
      console.log(`REQUESTED URL: ${event.request.url}`);

      const parsedUrl = new URL(event.request.url); // URL API
      console.log('Parsed URL: ', parsedUrl);
      const pathname = parsedUrl.pathname;

      //ANALYSE REQUEST AND RESPOND WITH A CACHING STRATEGY

      // JS includes
      if (pathname.includes('.js')) {
         console.log('JS file => cache strategy JS');
      }
      if (pathname.indexOf('.css') > -1) {
         console.log('CSS file => cache strategy CSS');
      }
      // JS RegEx
      const regEx = /png/;
      if (parsedUrl.pathname.match(regEx)) {
         console.log('PNG file => cache strategy IMG');
      }
      // We can also send back a custom response
      if (pathname.includes('ndc')) {
         console.log(`Fetching ${event.request.url}`);
         const body = `
          <!doctype html>
          <head>
              <title>Service Worker HTML generation</title>
          </head>
          <body>
              <p style="color:red;">
                  The URL is ${event.request.url}
              </p>
              <p>Pathname is ${pathname}
              <ul>
                  <li>Cache: ${event.request.cache}</li>
                  <li>Credentials: ${event.request.credential}</li>
                  <li>Destination: ${event.request.destination}</li>
                  <li>Method: ${event.request.method}</li>
                  <li>Referrer: ${event.request.referrer}</li>
              </ul>
          </body>
          </html>
      `;
         const response = new Response(body, {
            status: 200,
            statusText: 'OK',
            headers: {
               'Content-type': 'text/html',
            },
         });
         // SW RESPONSE TO INTERCEPTING REQUEST
         event.respondWith(response);
      }
   }
}

//COMMUNICATION TO AND FROM PAGE/SW
//------------------------------------
// SW => PAGE
function sendMessageToPage(msg) {
   console.log('FN sendMessage');
   self.clients.matchAll().then(function (clients) {
      clients.forEach(function (client) {
         console.log('[SW] sending message to PAGE ' + msg);
         console.log('CLIENT ' + client);
         client.postMessage(msg);
      });
   });
}
// SW => PAGE
function alertPagesUpdate(msg) {
   clients
      .matchAll({
         includeUncontrolled: true,
         type: 'window',
      })
      .then(clients => {
         clients.forEach(client => {
            const clientId = client.id;
            const type = client.type;
            const url = client.url;
            client.postMessage(msg);
         });
      });
}

function listenToPageMessage(event) {
   const data = JSON.parse(event.data);
   console.log('');
   console.log('----- SW receiving message from PAGE -----');
   console.log(data);
   console.log('----- SW receiving message from PAGE -----');
   console.log('');
}
