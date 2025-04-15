// 要发送的通知
export const createOptions = (j) => {
  // j 为消息的序号
  return [
    "shanaiduo的消息" + j,
    {
      body: "浇花第" + j + "次",
      // 消息条标题中展示的图标
      icon: "./assets/48.png",
      // 消息内容中展示的图片
      image: "./assets/shanaiduo.jpeg",
      // 移动端展示的应用图标
      badge: "./assets/48.png",

      // 通知的唯一标识，相同 tag 的新通知会替换旧通知 ‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️
      tag: "confirm-notification",

      // 是否在替换相同 tag 的通知时显示重新通知提示（需与 tag 配合使用）
      renotify: true, // true表示显示重新通知提示

      // 是否静音（不播放提示音或振动）
      silent: false, // true表示静默通知，不会发出声音

      // 自定义提示音文件的 URL（部分浏览器不支持
      sound: "./assets/notification.mp3",

      // 震动模式（移动端支持，单位毫秒）
      vibrate: [200, 100, 200],

      // 通知的创建时间（毫秒时间戳）
      timestamp: Date.now(),

      // 是否要求用户手动关闭通知（默认自动关闭）
      requireInteraction: true, // true表示用户必须手动关闭通知

      // 传递自定义数据，可通过通知对象访问
      data: {
        data: "https://baidu.com",
        type: "url"
      },

      // 文字方向（"auto"/"ltr"/"rtl"）
      dir: "auto",

      // 通知的语言（遵循 BCP 47 标准）
      lang: "zh-CN",

      // 通知的操作按钮（每个按钮需包含 action 和 title）
      actions: [
        {
          action: "confirm",
          title: "确认",
          icon: "./assets/48.png"
        },
        {
          action: "cancel",
          title: "取消",
          icon: "./assets/48.png"
        },
      ]
    },
  ];
}
