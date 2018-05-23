var VERSION = 'v30';

// 缓存
self.addEventListener('install', function(event) {
  console.log('安装')
  event.waitUntil(
    caches.open(VERSION).then(function(cache) {
      return cache.addAll([
        './index.html',
        './app.js'
      ]);
    })
  );
});

// 缓存更新
self.addEventListener('activate', function(event) {
  console.log('激活')
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 捕获请求并返回缓存数据
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(response) {
    caches.open(VERSION).then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('./index.html');
  }));
});