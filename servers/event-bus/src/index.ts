import fs from "node:fs";
import express from "express";
import bodyPaser from "body-parser"
import cors from "cors"
import axios from "axios";
import path from "node:path";
import EventStorage from "./eventStorage.ts";
import esbuildPluginEnv from "@microservices/esbuild-plugin-env";

const eventStorage = new EventStorage();

const app = express();
app.use(bodyPaser.json())
app.use(cors())

// app.get("/posts/:id/comments", (req, res) => {
//   const { id } = req.params;
//   res.json(commentsHandler.getCommentsByPostId(id));
// });

// 同步读出都有哪些服务需要通知
// 获取现在文件夹下有哪些文件夹
const blackTable = ["esbuild-config", "common", "event-bus", "https-example"];
const filename: string[] = [];
console.log(process.cwd());
// 这个地方为什么是"../"呢？
// 因为在Node.js中，fs.readdirSync("../") 使用的相对路径确实是相对于 ​当前工作目录​（即 process.cwd() 的值），而不是当前执行文件所在的目录。
// turbo执行dist/cjs/index.cjs的时候，工作目录是当前项目package.json的目录，而不是dist/cjs/的目录。
for (const dir of fs.readdirSync("../")) {
  if (blackTable.indexOf(dir) !== -1) continue;
  const fileOrDirPath = path.resolve("../", dir);
  const stat = fs.statSync(fileOrDirPath);
  if (!stat.isDirectory()) {
    continue;
  }
  const name = dir.replace(/-/g, '_').toUpperCase();

  // 现在fileOrDirPath肯定就是文件夹了
  filename.push(name);
}

app.get("/events", (req, res) => {
  res.json(eventStorage.getEvents());
});

app.post("/events", (req, res) => {
  console.log("Received event:", req.body.type);
  const events = req.body;
  // 记录下所有的事件
  eventStorage.addEvent(events);
  // for (const name of filename) {
  //   console.log(name, esbuildPluginEnv[`MICRO_APP_${name}_URL`]! + ':' + esbuildPluginEnv[`MICRO_APP_${name}_PORT`]! + '/events');
  // }
  // 遍历filename，发送post请求
  for (const name of filename) {
    axios.post(esbuildPluginEnv[`MICRO_APP_${name}_PROTOCOL`]! + esbuildPluginEnv[`MICRO_APP_${name}_HOST`]! + esbuildPluginEnv[`MICRO_APP_${name}_PORT`]! + '/events', {...events})
  }
  res.status(200).json({});
});

app.listen(esbuildPluginEnv.MICRO_APP_EVENT_BUS_PORT!.slice(1), () => {
  console.log(`Server is running on port ${esbuildPluginEnv.MICRO_APP_EVENT_BUS_PORT}`);
})
