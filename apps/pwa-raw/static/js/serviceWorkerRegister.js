// 注册 Service worker
if ("serviceWorker" in window.navigator) {
  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      console.log("registerServiceWorker");
      try {
        /**
         * navigator.serviceWorker是一个ServiceWorkerContainer对象
         * navigator.serviceWorker.register返回一个Promise<ServiceWorkerRegistration>对象
         */
        const registration = await navigator.serviceWorker.register(
          /**
           * 注意：这里可以使用绝对路径也可以使用相对路径
           * 假设访问html页面的url是https://test.com/notifi/
           * 1. 如果第一个参数写的是绝对路径：/nihao/background.js，那么就会请求https://test.com/nihao/background.js这个js文件
           * 2. 如果第一个参数写的是相对路径：./js/background.js，那么就会请求https://test.com/notifi/js/background.js这个js文件
           */
          "./background.js",
          {
            /**
             * 这个值与访问html页面的url是紧密关联的
             * 假设访问html页面的url是https://test.com/notifi/
             * 1. 如果scope的值是绝对路径，那么scope可以是/开头的任意值
             *    例如：
             *    1.1 如果scope的值是 "/"，那么这个service worker会拦截 https://test.com/index.html这个html文件中发出的所有网络请求
             *    1.2 如果scope的值是 "/notifi"，那么这个service worker会拦截 https://test.com/notifi/index.html这个html文件中发出的所有网络请求
             * 2.  如果scope的值是相对路径
             */
            scope: "./",
          }
        );
        /**
         * ServiceWorkerRegistration对象的属性：installing ｜ waiting ｜ active，三个属性同一时间只有一个是非null的值
         */
        if (registration.installing) {
          console.log("正在安装 Service worker");
        } else if (registration.waiting) {
          console.log("已安装 Service worker installed");
        } else if (registration.active) {
          console.log("正在激活 Service worker");
        }
      } catch (error) {
        console.error(`注册失败：${error}`);
      }
    }
  };

  registerServiceWorker();
}

export {}
