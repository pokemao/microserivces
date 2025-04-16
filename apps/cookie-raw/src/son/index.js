const express = require('express')
const app = express()
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const key = fs.readFileSync('./crt/private.key');
const cert = fs.readFileSync('./crt/mydomain.crt');

const options = {
    key: key,
    cert: cert
};

// Run static server
https.createServer(options, app).listen(process.env.MICRO_APP_COOKIE_RAW_SON_PORT.slice(1), () => {
  console.log(`Example app listening on port ${process.env.MICRO_APP_COOKIE_RAW_SON_PORT}!`)
});

app.use(express.static('./src/son/public'))
