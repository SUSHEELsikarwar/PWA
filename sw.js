self.addEventListener("install", (e) => {

    console.log(e);
    e.waitUntil(caches.open("static").then((cache) => {
       return cache.addAll(["/", "./images/logo192.png", "./src/master.css"]);
    }))
})

// self.addEventListener('fetch', (e) =>{
//     e.respondWith( caches.match(e.request).then(response => {
//        return  response || fetch(e.request);
//     }))
// }); 
 
self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
      const response = await fetch(e.request);
      const cache = await caches.open("static");
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
  });