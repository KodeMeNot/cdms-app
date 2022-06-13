let version = '0.9.3_02_prod';

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

workbox.setConfig({ debug: false });

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// Detect and register any fetch calls using 'https://' and use the Network First Strategy by Workbox
workbox.routing.registerRoute(/(?:http:\/\/.*)/,workbox.strategies.networkFirst({
  cleanupOutdatedCaches:true
}));

const bgSyncPlugin = new workbox.backgroundSync.Plugin('requestqueue', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
});

workbox.routing.registerRoute(
  /\/api\/.*\/*.json/,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate(),
);

console.log("changing service worker to check if caching works fine");
// const staticCacheName = 'site-static-v5';
// const dynamicCacheName = 'site-dynamic-v5 ';
// const assets = [
//   '/'
//
// ];
//
// //install service worker
// self.addEventListener("install", evt => {
//   self.skipWaiting();
//   evt.waitUntil(
//     caches.open(staticCacheName).then(cache => {
//       // console.log("caching assets");
//       cache.addAll(assets);
//     })
//   );
//
//   // console.log('service worker has been installed',evt);
//
// });
//
// self.addEventListener("activate", evt => {
//   // console.log('service worker has been activated',evt);
//   evt.waitUntil(
//     caches.keys().then(keys => {
//       return Promise.all(keys
//         .filter(key => key !== staticCacheName && key !== dynamicCacheName)
//         .map(key => {
//           // console.log(key);
//           caches.delete(key);
//           // caches.delete()
//         })
//       );
//       // console.log(keys);
//     })
//   );
//   // window.location.reload();
// });
//
// //fetch event
// self.addEventListener("fetch", evt => {
//   // console.log('fetch event', evt);
//   evt.respondWith(
//     caches.match(evt.request).then(cacheResponse => {
//       // console.log(cacheResponse,"+++++++++++++++++");
//       return cacheResponse || fetch(evt.request).then(fetchRes => {
//         return caches.open(dynamicCacheName).then(cache => {
//           cache.put(evt.request.url, fetchRes.clone());
//           return fetchRes;
//         });
//       });
//     })
//   );
// });
//
// self.addEventListener('message', event => {
//   console.log("message event occured", event);
//   if (event.data === 'skipWaiting') {
//     console.log("event data is skipWaiting");
//     self.skipWaiting();
//   }
// });
