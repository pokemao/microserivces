import {randomBytes} from "crypto";
import express from "express";
import bodyPaser from "body-parser"
import PostsStorage from "./postsStorage.ts";

const app = express();
app.use(bodyPaser.json())

const postsHandler = new PostsStorage();

app.get("/post", (req, res) => {
  res.json(postsHandler.getPosts());
});

app.post("/post", (req, res) => {
  const id = randomBytes(4).toString("hex"); // 生成随机的id
  const { title = '' } = req.body; // 获取title
  const post = {
    id,
    title
  }
  postsHandler.addPost(post)
  res.status(201).json(post);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
})
