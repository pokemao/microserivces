// 前端页面运行的端口

const express = require('express');
const https = require('https');
const webPush = require("web-push");
const dotenv = require('dotenv');
const fs = require('fs');
const bodyParser = require('body-parser');

dotenv.config()
if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log(
    "You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
      "environment variables. You can use the following ones:" +
      "\n" +
      JSON.stringify(webPush.generateVAPIDKeys()) +
      "\n" +
      "Write it to .env file. Like: " +
      "\n" +
      "VAPID_PUBLIC_KEY=BAe5pWiBwO_44yDtO5z52H38itvhj_RJs956lBk--0Sm71aKUcW7I8tY2CFOToo0kHQPEBd3Gyau-1sLLmiOiv8" +
      "\n" +
      "VAPID_PRIVATE_KEY=EEvwFH3SFl9rq1Yg0QgMlKsI938f3vMn9lftHKpboBA"
  );
  process.exit(1);
}

const app = express();
app.use(bodyParser.json());
/**https 服务
 * 不用 https 服务的原因：
 * 1. 电脑浏览器对于localhost这个域名不会校验https，所以localhost开发pwa的时候可以直接使用http
 * 2. 手机想要测试pwa的时候，就需要https和确定的域名了，因为需要域名所以要使用charles，使用charles的时候可以直接把一个https的远端地址代理到localhost上，所以也就不需要https了
 */
// const key = fs.readFileSync('./crt/private.key');
// const cert = fs.readFileSync('./crt/mydomain.crt');
// const options = {
//     key: key,
//     cert: cert
// };
// // Run static server
// https.createServer(options, app).listen('8080', () => {
//     console.log(`Server is running on port 8080`);
// });
app.listen(process.env.MICRO_APP_PWA_RAW_PORT.slice(1), () => {
  console.log(`Server is running on port ${process.env.MICRO_APP_PWA_RAW_PORT}`);
});

webPush.setVapidDetails(
  "mailto:15222646988@163.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);
app.get("/vapidPublicKey", function (req, res) {
  res.send(process.env.VAPID_PUBLIC_KEY);
});
app.post("/register", function (req, res) {
  // A real world application would store the subscription info.
  res.sendStatus(201);
});
app.post("/sendNotification", function (req, res) {
  console.log("req.body: ", req.body);
  const subscription = req.body.subscription;
  const payload = req.body.payload;
  const options = {
    TTL: req.body.ttl,
  };

  setTimeout(function () {
    webPush
      .sendNotification(subscription, payload, options)
      .then(function () {
        res.sendStatus(201);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  }, req.body.delay * 1000);
});

app.use(express.static('static'));
