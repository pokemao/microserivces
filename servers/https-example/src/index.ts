import express from "express"
import fs from "fs"
import https from "https"
import 'dotenv/config';
import cookieParser from 'cookie-parser'

const app = express();
app.use(cookieParser());

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
  res.cookie('userToken', 'abc123', {
    maxAge: 3600000, // 过期时间（毫秒，优先级高于expires）
    httpOnly: true,   // 禁止客户端 JS 访问，防 XSS 攻击
    secure: true,     // 仅通过 HTTPS 传输
    sameSite: 'none' // 限制同站点访问
  });
  next();
})

app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});
