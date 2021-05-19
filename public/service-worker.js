const staticCacheName = 'site-static-v7';
const dynamicCacheName = 'site-dynamic-v4';
const assets = [
  '/',
  '/index.html',
  'manifest.json',
  '@App.svelte',
  '@Logo.svelte',
  '@Main.svelte',
  '@NavAnimation.svelte',
  '@Navbar.svelte',
  '@ShoppingList.svelte',
  '@Sidebar.svelte',
  '@Fallback.svelte'
]

// cache size limit funtion
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    caches.keys().then(keys => {
      if(keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    })
  })
};

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets);
    })
  ); 
});

self.addEventListener('activate', evt =>{
  evt.waitUntil(
    caches.keys().then( keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', evt =>{
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone());
            limitCacheSize(dynamicCacheName, 15);
            return fetchRes;
          })
        });
      }).catch(() => {
        if(evt.request.url.indexOf('.html') > -1) {
          return caches.match('@Fallback.svelte');
        }        
      }) 
    );
});
