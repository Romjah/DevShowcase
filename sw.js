// Service Worker for DevShowcase
const CACHE_NAME = 'devshowcase-cache-v2';
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

// Cache images separately for better control
const IMAGE_CACHE_NAME = 'devshowcase-images-v1';
const imagesToCache = [
  '/img/hero-image.svg',
  '/img/AndreDeSousa.jpeg'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache main resources
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Main cache opened');
          return cache.addAll(urlsToCache);
        }),
      // Cache images separately
      caches.open(IMAGE_CACHE_NAME)
        .then(cache => {
          console.log('Image cache opened');
          return cache.addAll(imagesToCache);
        })
    ])
  );
  // Force immediate activation
  self.skipWaiting();
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, IMAGE_CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
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
  
  // Special handling for images
  if (isImageRequest(request)) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then(cache => {
        // Try to get from cache first
        return cache.match(request).then(cachedResponse => {
          // Return cached response if available
          if (cachedResponse) {
            // Always fetch a fresh copy in the background and update cache
            const fetchPromise = fetch(request).then(networkResponse => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            }).catch(() => cachedResponse);
            
            // Return cached response immediately, but update cache in the background
            return cachedResponse;
          }
          
          // If not in cache, fetch from network and cache
          return fetch(request).then(networkResponse => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          }).catch(() => {
            // Return a placeholder if network request fails
            console.log('Failed to fetch image:', request.url);
          });
        });
      })
    );
    return;
  }
  
  // Handle other requests
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
        
        // Cache the new response
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