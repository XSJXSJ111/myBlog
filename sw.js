// 当前缓存版本的唯一标识符，用当前时间代替
var cacheKey = 'v52';
// 当前缓存的白名单，在新脚本的 install 事件里将使用白名单里的 key 
var cacheWhitelist = [cacheKey];
// 需要被缓存的文件的 URL 列表 
var cacheFileList = global.serviceWorkerOption.assets;
console.log('缓存列表',cacheFileList)

// 监听 install 事件
self.addEventListener('install', function (event) {
  console.log('安装')
  // 等所有资源缓存完成时，才可以进行下一步 
  event.waitUntil(
    caches.open(cacheKey).then(function (cache) {
      // 要缓存的文件 URL 列表
      return cache.addAll(cacheFileList);
    }));
});
// 拦截网络请求
self.addEventListener('fetch', function (event) {
  console.log('网络请求')
  event.respondWith(
    // 去缓存中查询对应的请求 
    caches.match(event.request).then(function (response) {
      // 如果命中本地缓存，就直接返回本地的资源 
      if (response) {
        return response;
      }
      // 否则就用 fetch 下载资源 
      return fetch(event.request);
    })
  );
});

// 新的 Service Workers 线程取得控制权后，将会触发 activate 事件
self.addEventListener('activate', function (event) {
  console.log('激活')
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (cacheName) {
        // 将不在白名单中的缓存全部清理掉
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          // 删除缓存
          console.log('删除')
          return caches.delete(cacheName);
        }
      }));
    }));
});