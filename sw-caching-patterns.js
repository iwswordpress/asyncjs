function cacheElseNetwork(event) {
	// console.log('fetch event', event);
	event.respondWith(
		caches
			.match(event.request) // try to find entry for this request in CACHE API
			.then(function (cacheResponse) {
				// check cache then return result if not null
				// if so (|| equals OR) go on to network as normal
				return cacheResponse || fetch(event.request);
			}),
	);
}

function cacheElseNetworkAndStoreDynamic(event) {
	//console.log(event);
	event.respondWith(
		caches
			.match(event.request, {
				ignoreSearch: true,
			})

			.then(function (cacheResponse) {
				// if file in cache...
				if (cacheResponse) {
					return cacheResponse;
				} else {
					// go to network
					//console.log(event.request);
					return fetch(event.request) //
						.then(function (networkResponse) {
							return caches.open(dynamicCacheName).then(function (cache) {
								//console.log('+++ STORING : ' + event.request.url + ' in CACHE: ' + dynamicCacheName + " +++");
								// response is a stream
								// and can only be consumed once so we make a clone/copy.
								// save a clone of stream to cache for next time...
								cache.put(event.request.url, networkResponse.clone());
								// Clean up number of entries of cache - for demo very small...
								// ++++++++ limit Cache Size ++++++++++
								// limitCacheSize(dynamicCacheName, 4);
								// ++++++++++++++++++++++++++++++++++++
								return networkResponse;
							});
						});
				}
			})
			.catch(function () {
				// If we are ONLINE and we can go to network then server will give a 404

				// If we are off line and we can't get an assumed page from cache then we can offer a graceful fallback page.

				// ANALYSE REQUEST AND RESPOND WITH A CACHING STRATEGY
				const parsedUrl = new URL(event.request.url);
				//console.log("Paresed URL: ", parsedUrl);
				const pathname = parsedUrl.pathname;
				console.log(pathname);

				// FALLBACK PAGES for html pages
				if (pathname.indexOf('.html') > -1) {
					console.log('         ');
					console.log('         ');
					console.log('!!!!!!!!!!!!!');
					console.log('PATHNAME ' + pathname);
					console.log('         ');
					console.log('HTML file => cache strategy HTML');
					console.log('         ');
					console.log('USE FALLBACK_PAGE');
					console.log('         ');
					console.log('!!!!!!!!!!!!!');
					console.log('         ');
					console.log('         ');
					// We can give specific fallback pages as desired.
					// Here we give one for the form.html page and another for all other HTML pages.
					if (pathname.indexOf('form.html') > -1) {
						return caches.match(FALLBACK_PAGE);
					} else {
						return caches.match(FALLBACK_PAGE2);
					}
				}
			}),
	);
}
