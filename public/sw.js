const CACHE_NAME = 'lesson-6-cache';

const cacheUrls = [
	'/',
	'index.html',
	'utils/constants.js',
	'utils/safe.js',
	'main.css',
	'main.js',
	'components/Board/Board.tmpl.js',
	'components/Board/Board.js',
	'components/Board/Board.css',
	'modules/ajax.js',
];

this.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(cacheUrls);
			})
	);
});

this.addEventListener('fetch', (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((cachedResponse) => {

				if (!navigator.onLine && cachedResponse) {
					return cachedResponse;
				}

				return fetch(event.request);
			})
	)
});


