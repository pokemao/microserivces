const express = require('express');
const https = require('https');
const webPush = require("web-push");
const dotenv = require('dotenv');
const fs = require('fs');
const bodyParser = require('body-parser');

dotenv.config()
// if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
//   console.log(
//     "You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
//       "environment variables. You can use the following ones:"
//   );
//   process.exit(1);
// }

const vapidKeys = webPush.generateVAPIDKeys();
console.log('shao vapidKeys', vapidKeys);


const app = express();
app.use(bodyParser.json());
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
webPush.setVapidDetails(
  "mailto:shaoyuzhe@didiglobal.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
app.get("/vapidPublicKey", function (req, res) {
  console.log('hello');

  res.send(vapidKeys.publicKey);
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

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
