import express from "express"
import fs from "fs"
import https from "https"
import 'dotenv/config';

const app = express();

const key = fs.readFileSync('./crt/private.key');
const cert = fs.readFileSync('./crt/mydomain.crt');

const options = {
    key: key,
    cert: cert
};

// Run static server
https.createServer(options, app).listen(process.env.MICRO_APP_HTTPS_EXAMPLE_PORT, () => {
    console.log(`Server is running on port ${process.env.MICRO_APP_HTTPS_EXAMPLE_PORT}`);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://son.localhost:9444');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  // res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  // res.header('Cross-Origin-Opener-Policy', 'same-origin');
  next();
})

app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});
