// Service Worker for DevShowcase
const CACHE_NAME = 'devshowcase-cache-v3'; // Increment version to force cache update
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/projects.js',
  '/js/translations.js',
  '/js/projects-data.js',
  '/js/animation.js',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
  // Force immediate activation
  self.skipWaiting();
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Helper function to check if a request is for an image
function isImageRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/img/') || 
         request.destination === 'image';
}

// Intercept fetch requests
self.addEventListener('fetch', event => {
  const request = event.request;
  
  // Don't cache images - always fetch from network
  if (isImageRequest(request)) {
    event.respondWith(
      fetch(request).catch(error => {
        console.log('Failed to fetch image:', request.url, error);
        return new Response('Image not found', { status: 404 });
      })
    );
    return;
  }
  
  // Handle other requests with caching
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      return fetch(request).then(networkResponse => {
        // Check if we received a valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        
        // Clone the response 
        const responseToCache = networkResponse.clone();
        
        // Cache the new response (except images)
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });
        
        return networkResponse;
      }).catch(() => {
        // Fallback for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
}); 