// service worker 发送前端消息
import { createOptions } from "./notificationOptions.js";

// 获取service worker
let registration = null;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready.then((e) => {
    registration = e;
  });
}

const counter = {
  i: 0,
}
const serivceNotificationPush = (counter) => {
  counter.i++;
  const [title, options] = createOptions(counter.i);
  if(registration){
    registration.showNotification(title, options);
  }
};
// 点击发送 service worker 消息
const frontServiceNotification = document.querySelector("#front_service_notification");
frontServiceNotification.addEventListener("click", () => {
  if (Notification.permission === "default") {
    console.log("index.html 没有权限");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        serivceNotificationPush(counter);
      } else {
        alert("请允许通知");
      }
    });
  } else if (Notification.permission === "granted") {
    console.log("index.html 有权限");
    serivceNotificationPush(coun);
  } else {
    alert("请允许通知");
  }
})

const loopCounter = {
  i: 0,
}

const loopNotificationPush = (counter) => {
  serivceNotificationPush(counter);
  setTimeout(loopNotificationPush, 5000, counter);
}
const loopFrontServiceNotification = document.querySelector("#loop_front_service_notification");
loopFrontServiceNotification.addEventListener("click", () => {
  if (Notification.permission === "default") {
    console.log("index.html 没有权限");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        loopNotificationPush(loopCounter);
      } else {
        alert("请允许通知");
      }
    })
  } else if (Notification.permission === "granted") {
    console.log("index.html 有权限");
    loopNotificationPush(loopCounter);
  } else {
    alert("请允许通知");
  }
})

export {}
