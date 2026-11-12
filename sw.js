/* Desk HF offline SW · rev d10x-pages-0936 · soft only */
const C="desk-hf-d10x-pages-0936";
self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("desk-hf-")&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=e.request.url;
  if(!(e.request.mode==="navigate"||/\.(html)(\?|$)/.test(u)||/\/raw\//.test(u)||/manifest\.webmanifest/.test(u)))return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(cache=>cache.put(e.request,c));return r;}).catch(()=>caches.open(C).then(cache=>cache.match(e.request).then(x=>x||cache.match(self.registration.scope)))));
});
