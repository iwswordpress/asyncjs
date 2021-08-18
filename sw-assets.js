const staticLocalCacheName = 'PRECACHE-V' + version;
// in case remote fails it does not affect local assets which are promises
// one fails then all fails
const staticRemoteCacheName = 'PRECACHE-REMOTE-V' + version;
// ADD DYNAMIC CACHE CONSTANT
var dynamicCacheName = 'DYNAMIC-V' + version;
var FALLBACK_PAGE = 'fallback.html';
var FALLBACK_PAGE2 = 'fallback2.html';
const localAssets = [
	'./manifest.json',
	'./', // for when not page specified, we need the base url
	'./index.html',
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
const remoteAssets = [
	'https://fonts.googleapis.com/css?family=Quicksand',
	'https://fonts.googleapis.com/css2?family=Quicksand',
	'https://fonts.gstatic.com/s/quicksand/v22/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o58a-wjw3UD0.woff2', // essential for offline
	// NB The second link may change - now v22 so this may not work until the font is stored in the dynamic cache
];
