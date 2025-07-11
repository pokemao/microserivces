let isPWA = false;
// 判断当前是否是pwa的环境
console.log('当前是否是pwa环境？ ', isPWA = window.matchMedia('(display-mode: standalone)').matches)

if(isPWA) {
  // 是pwa环境
  console.log('cookie: ', document.cookie);
  console.log('localStorage: ', localStorage.getItem('name'));

}else {
  // 不是pwa环境
  document.cookie = 'name=honey'
  localStorage.setItem('name', 'honey')
}
