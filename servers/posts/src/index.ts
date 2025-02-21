import {randomBytes} from "crypto";
import express from "express";
import bodyPaser from "body-parser"
import PostsStorage from "./postsStorage.ts";
import 'dotenv/config';

const app = express();
app.use(bodyPaser.json())

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
  res.status(201).json(post);
});

app.listen(process.env.MICRO_APP_POST_PORT, () => {
  console.log(`Server is running on port ${process.env.MICRO_APP_POST_PORT}`);
})
