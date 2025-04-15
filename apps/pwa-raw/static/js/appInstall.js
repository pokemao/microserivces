// pwa安装器
let appInstaller = null;
// 监听beforeinstallprompt事件
window.addEventListener("beforeinstallprompt", (e) => {
  // 如果这里触发beforeinstallprompt这个事件，说明浏览器是支持把一个网页下载到主屏幕的
  // 阻止浏览器默认的安装行为
  /**
   * 什么默认行为呢？
   * 1. 浏览器只要触发beforeinstallprompt事件
   * 2. 浏览器会显示一个安装按钮
   */
  e.preventDefault();
  console.log("浏览器支持beforeinstallprompt");
  // 记录下来，说明浏览器支持安装行为
  appInstaller = e;
});

const install = document.querySelector("#install");
install.addEventListener("click", () => {
  if (appInstaller) {
    appInstaller.prompt();
  } else {
    alert("浏览器不支持安装行为");
  }
});

export {}
