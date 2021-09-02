// Create some caches (folders) for our app.
const staticLocalCacheName = 'PRECACHE-V' + version;
// in case remote fails it does not affect local assets which are promises
// one fails then all fails
const staticRemoteCacheName = 'PRECACHE-REMOTE-V' + version;
// ADD DYNAMIC CACHE CONSTANT
var dynamicCacheName = 'DYNAMIC-V' + version;
// Fallback pages if offline and no cache copy. Can change depending on resource requested.
var FALLBACK_PAGE = 'fallback.html';
var FALLBACK_PAGE2 = 'fallback2.html';
// Precache shell of app. Essentials to avoid slowing down iniital load. Can load more once page loaded.
const localAssets = [
	'./manifest.json',
	'./', // for when not page specified, we need the base url
	'./index.html',
	'./article.html',
	'./articles.html',
	'./contacts.html',
	'./fallback.html',
	'./fallback2.html',
	'./images/offline-black.png',
	'./images/offline.png',
	'./css/pwa-course.css',
	'./js/gone-offline.js',
	'./js/is-offline.js',
	'./js/show-hide-a2hs.js',
	'./js/deferrred-prompt.js',

	// if you mistype or call a file not available, they all fail to load as it is a promise and transaction based.
];
// As loading assets is a transaction, we can separate local and remote assets in case remote assets not available, which would cause all loading to fail.
const remoteAssets = [
	'https://fonts.googleapis.com/css?family=Quicksand',
	'https://fonts.googleapis.com/css2?family=Quicksand',
	'https://fonts.gstatic.com/s/quicksand/v22/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o58a-wjw3UD0.woff2', // essential for offline
	// NB The second link may change - now v22 so this may not work until the font is stored in the dynamic cache
];
