import {randomBytes} from "crypto";
import express from "express";
import bodyPaser from "body-parser"
import "dotenv/config";
import commentsStorage from "./commentsStorage.ts";

const app = express();
app.use(bodyPaser.json())

const commentsHandler = new commentsStorage();

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.json(commentsHandler.getCommentsByPostId(id));
});

app.post("/posts/:id/comments", (req, res) => {
  const id = randomBytes(4).toString("hex"); // 生成随机的id
  const { content = '' } = req.body; // 获取title
  const { id: postId } = req.params; // 获取postId
  const comment = {
    id,
    content
  }
  commentsHandler.addComment(postId, comment);
  res.status(201).json(commentsHandler.getCommentsByPostId(postId));
});

app.listen(process.env.MICRO_APP_COMMENT_PORT, () => {
  console.log(`Server is running on port ${process.env.MICRO_APP_COMMENT_PORT}`);
})
