const cacheName = 'v1';

self.addEventListener('install', function(event) {
  console.log('background.js: Service Worker install', event);

  // 如果之前注册了 Service Worker，那么调用self.skipWaiting()就会先卸载之前的 Service Worker
  // 跳过等待，立即激活 Service Worker
  event.waitUntil(Promise.resolve().then(_ => console.log('install before skipWaiting')));

  event.waitUntil(self.skipWaiting());

  event.waitUntil(Promise.resolve().then(_ => console.log('install after skipWaiting')));

  // 确保 Service Worker 不会在 waitUntil() 里面的代码执行完毕之前安装完成
  event.waitUntil(
      // 创建了叫做 v1 的新缓存
      caches.open(cacheName).then(function(cache) {
        /**
         *  cache.addAll([
         *    new Request('/'),
         *    new Request('/index.html'),
         *    new Request('/manifest.html')
         *  ]);
         */
        return cache
      }).then(function(cache) {
        return cache.addAll([
          './',
          './index.html',
          './manifest.json'
        ]);
      }).then(res => {
        console.log('background.js: Service Worker install success', res);
        return res
      }).catch(function(err) {
        console.log('background.js: Service Worker install error', err);
        return undefined
      })
  );

  // 这个函数执行完毕就会进入到‘active'状态了
});

self.addEventListener("activate", (event) => {
  console.log("background.js: Service Worker activated", event);
  // 激活 Service Worker 后立即获取控制权, 这样就可以立即接管页面
  // 如果不调用self.clients.claim()，sevice worker会在下一次页面刷新时才会生效
  event.waitUntil(self.clients.claim());
  // 把不是cacheName的桶都删除掉
  // 获取现在浏览器中都有哪些桶
  event.waitUntil(new Promise(async (resolve, reject) => {
    try {
      const cacheBucketList = await caches.keys();
      // 遍历桶
      cacheBucketList.forEach((bucket) => {
        if (bucket !== cacheName) {
          // 删除旧的桶
          // 这个方法是删除整个桶
          caches.delete(bucket);
        }
      });
      resolve()
    }catch (e) {
      reject(e)
    }
  }));
});

self.addEventListener("fetch", (event) => {
  console.log("background.js: Service Worker fetch", event, event.request.url);
  // 拦截请求
  event.respondWith(networkFirst(event.request));
});

// 缓存优先
const cacheFirst = async (request) => {
  // 从缓存中读取 respondWith表示拦截请求并返回自定义的响应
  const responseFromCache = await caches.match(request);
  console.log('background.js: 从桶中查找到的缓存responseFromCache是: ', responseFromCache);
  if (responseFromCache) {
      return responseFromCache
  }
  // 如果缓存中没有，就从网络中请求
  const responseFromServer = await fetch(request);
  const cache = await caches.open(cacheName);
  // 将请求到的资源添加到缓存中
  cache.put(request, responseFromServer.clone());
  return responseFromServer;
}

// 网络优先
const networkFirst = async (request) => {
  try {
    // 从网络中请求
    const responseFromServer = await fetch(request);
    const cache = await caches.open(cacheName);
    // 将请求到的资源添加到缓存中
    cache.put(request, responseFromServer.clone());
    return responseFromServer;
  }
  catch (error) {
    // 如果网络请求失败，就从缓存中读取
    const responseFromCache = await caches.match(request);
    return responseFromCache;
  }
}

self.addEventListener('push', function(event) {
  // Retrieve the textual payload from event.data (a PushMessageData object).
  // Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
  // on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
  const payload = event.data ? event.data.text() : 'no payload';

  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    // Show a notification with title 'ServiceWorker Cookbook' and use the payload
    // as the body.
    self.registration.showNotification('ServiceWorker Cookbook', {
      body: payload,
    })
  );
});
