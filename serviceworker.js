let currentCacheName = 'restaurant-current-v1';

// After install event, add files to cache
self.addEventListener('install', function(event) {
  event.waitUntil(
	caches.open(currentCacheName).then(function(cache) {
	  return cache.addAll([
        './',
        './img/1.jpg',
		'./img/2.jpg',
		'./img/3.jpg',
		'./img/4.jpg',
		'./img/5.jpg',
		'./img/6.jpg',
		'./img/7.jpg',
		'./img/8.jpg',
		'./img/9.jpg',
		'./img/10.jpg',
		'./index.html',
		'./restaurant.html',
		'./css/styles.css',
		'./data/restaurants.json',
		'./js/dbhelper.js',
		'./js/main.js',
		'./js/restaurant_info.js',
		'./js/sw_registration.js'
	  ]);
	})
  );
});

// on fetch event, serve content from the cache or go to the network
self.addEventListener('fetch', function(event) {
  event.respondWith(
	caches.match(event.request)
	.then(function(cachedResponse) {
		if (cachedResponse) {
			return cachedResponse;
		}
	  return fetch(event.request).then(realResponse => {
			if (realResponse.status === 404) {
				return;
			}
			return caches.open(currentCacheName).then(cache => {
				cache.put(event.request.url, realResponse.clone());
				return realResponse;
			})
	  })
	})
	);
})

// If a new service worker is activated, delete old cache
self.addEventListener('activate', function(event) {
  event.waitUntil(
	caches.keys()
	.then(function(cacheNames) {
	  return Promise.all(
		cacheNames.filter(function(cacheName) {
		  return cacheName.startsWith('restaurant-') &&
			cacheName != currentCacheName;
		  }).map(function(cacheName) {
		    return caches.delete(cacheName);
		  })
	  );
	})
  );
})
