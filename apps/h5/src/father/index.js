const express = require('express')
const app = express()
const https = require('https');
const fs = require('fs');

const key = fs.readFileSync('./crt/private.key');
const cert = fs.readFileSync('./crt/mydomain.crt');

const options = {
    key: key,
    cert: cert
};

// Run static server
https.createServer(options, app).listen(8444, () => {
  console.log('Example app listening on port 8444!')
});

app.use(express.static('./src/father/public'))
