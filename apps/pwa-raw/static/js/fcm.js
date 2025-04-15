// 通过fcm发送消息
import urlBase64ToUint8Array from './base642U8Array.js';

Notification.requestPermission()
if (Notification.permission === "default") {
  console.log("index.html 没有权限");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("index.html 有权限");

    } else {
      alert("请允许通知");
    }
  });
} else if (Notification.permission === "granted") {
  console.log("index.html 有权限");

} else {
  alert("请允许通知");
}




navigator.serviceWorker.ready
.then(function(registration) {
  // Use the PushManager to get the user's subscription to the push service.
  return registration.pushManager.getSubscription()
  .then(async function(subscription) {
    // If a subscription was found, return it.
    if (subscription) {
      console.log('shao has subscription', subscription);
      // subscription.unsubscribe().then(function(successful) {
      //   console.log('shao unsubscribe successful', successful);
      // })
      return subscription;
    }

    // Get the server's public key
    const response = await fetch('./vapidPublicKey');
    console.log('shao response', response);

    const vapidPublicKey = await response.text();
    console.log('shao vapidPublicKey', vapidPublicKey);
    // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
    // urlBase64ToUint8Array() is defined in /tools.js
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    console.log('shao convertedVapidKey', convertedVapidKey);

    // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
    // send notifications that don't have a visible effect for the user).

    console.log('shao registration.pushManager.subscribe', registration.pushManager.subscribe);
    let res;

    try {
      res = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });
    }catch(e) {
      console.log('shao subscribe e code: ', e.code, ' message: ', e.message, ' name: ', e.name);
    }

    console.log('shao res', res);
    return res
  });
}).then(function(subscription) {
  if(!subscription) {
    return;
  }
  console.log('shao subscription', subscription);

  // Send the subscription details to the server using the Fetch API.
  // fetch('./register', {
  //   method: 'post',
  //   headers: {
  //     'Content-type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     subscription: subscription
  //   }),
  // });

  const doIt = document.getElementById('doIt')
  const fun = function() {
    const payload = document.getElementById('notification-payload').value;
    const delay = document.getElementById('notification-delay').value;
    const ttl = document.getElementById('notification-ttl').value;

    // Ask the server to send the client a notification (for testing purposes, in actual
    // applications the push notification is likely going to be generated by some event
    // in the server).

    fetch('./sendNotification', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription: subscription,
        payload: payload,
        delay: delay,
        ttl: ttl,
      }),
    });
  };
  doIt.addEventListener('click', fun);

}).catch((e) => {
  console.log(e);
})

export {}
