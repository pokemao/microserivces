// 发送通知
import { createOptions } from "./notificationOptions.js";
const counter = {
  i: 0,
};
const frontNotificationPush = (counter) => {
  counter.i++;
  const [title, option] = createOptions(counter.i);
  try {
    const notifi = new Notification(title, option);
    notifi.onclick = () => {
      console.log("点击了通知");
      notifi.close();
      const data = notifi.data;
      if(data && data.type === "url") {
        window.focus();
        window.open(data.data);
        return
      }
      console.log("类型不是url的通知！！！");
    }
  }catch (e) {
    console.error("发送通知失败：", e);
  }
};

const frontNotification = document.querySelector("#front_notification");
frontNotification.addEventListener("click", () => {
  if (Notification.permission === "default") {
    console.log("index.html 没有权限");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        frontNotificationPush(counter);
      } else {
        alert("请允许通知");
      }
    });
  } else if (Notification.permission === "granted") {
    console.log("index.html 有权限");
    frontNotificationPush(counter);
  } else {
    alert("请允许通知");
  }
});

const loopCounter = {
  i: 0,
}
const loopNotificationPush = (counter) => {
  frontNotificationPush(counter);
  setTimeout(loopNotificationPush, 5000, counter);
};

const loopFrontNotification = document.querySelector("#loop_front_notification");
loopFrontNotification.addEventListener("click", () => {
  if (Notification.permission === "default") {
    console.log("index.html 没有权限");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        loopNotificationPush(loopCounter);
      } else {
        alert("请允许通知");
      }
    });
  } else if (Notification.permission === "granted") {
    console.log("index.html 有权限");
    loopNotificationPush(loopCounter);
  } else {
    alert("请允许通知");
  }
});

export {}
