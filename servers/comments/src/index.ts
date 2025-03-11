import {randomBytes} from "crypto";
import express from "express";
import bodyPaser from "body-parser"
import cors from "cors"
import commentsStorage from "./commentsStorage.ts";
import "dotenv/config";
import axios from "axios";
import { commentCreateEventData, commentStatus, eventType } from "../../common/src/type.ts";

const app = express();
app.use(bodyPaser.json())
app.use(cors())

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
    content,
    status: commentStatus.pending,
  }
  commentsHandler.addComment(postId, comment);

  const eventBusUrl = process.env.MICRO_APP_EVENT_BUS_URL! + ':' + process.env.MICRO_APP_EVENT_BUS_PORT! + '/events';
  axios.post(eventBusUrl, {
    id: randomBytes(4).toString("hex"),
    type: 'CommentCreated',
    data: {
      postId,
      comment,
    } as commentCreateEventData
  } as eventType)

  res.status(201).json(commentsHandler.getCommentsByPostId(postId));
});

app.post("/events", (req, res) => {
  console.log("Received event:", req.body.type);
  const {type, data} = req.body;
  if (type === 'CommentModerated') {
    const {postId, comment: {id, status}} = data as commentCreateEventData;
    const comment = commentsHandler.changeCommentStatus(postId, id, status);
    const eventBusUrl = process.env.MICRO_APP_EVENT_BUS_URL! + ':' + process.env.MICRO_APP_EVENT_BUS_PORT! + '/events';
    axios.post(eventBusUrl, {
      id: randomBytes(4).toString("hex"),
      type: 'CommentUpdated',
      data: {
        postId,
        comment,
      } as commentCreateEventData
    })
  }
  res.json({});
})

app.listen(process.env.MICRO_APP_COMMENTS_PORT, () => {
  console.log(`Server is running on port ${process.env.MICRO_APP_COMMENTS_PORT}`);
})
