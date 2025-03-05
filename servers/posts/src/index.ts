import {randomBytes} from "crypto";
import express from "express";
import bodyPaser from "body-parser"
import cors from "cors"
import PostsStorage from "./postsStorage.ts";
import 'dotenv/config';
import axios from "axios";

const app = express();
app.use(bodyPaser.json())
app.use(cors())

const postsHandler = new PostsStorage();

app.get("/posts", (req, res) => {
  res.json(postsHandler.getPosts());
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex"); // 生成随机的id
  const { title = '' } = req.body; // 获取title
  const post = {
    id,
    title
  }
  postsHandler.addPost(post)
  // 把刚刚创建的post
  // 发送给event-bus
  // 告诉event-bus，我创建了一个post
  // 然后event-bus会把这个post发送给所有的服务
  // 然后所有的服务都会收到这个post
  // 然后关心这个事件的服务都会把这个post同步到自己的数据库中
  const eventBusUrl = process.env.MICRO_APP_EVENT_BUS_URL! + ':' + process.env.MICRO_APP_EVENT_BUS_PORT! + '/events';
  axios.post(eventBusUrl, {
    type: 'PostCreated',
    data: post
  })
  res.status(201).json(post);
});

app.post("/events", (req, res) => {
  console.log("Received event:", req.body.type);
  const events = req.body;
  res.json({});
})

app.listen(process.env.MICRO_APP_POSTS_PORT, () => {
  console.log(`Server is running on port ${process.env.MICRO_APP_POSTS_PORT}`);
})
