import {randomBytes} from "crypto";
import express from "express";
import bodyPaser from "body-parser"
import cors from "cors"
import 'dotenv/config';
import queryStorage from "./queryStorage.ts";
import { commentCreateEventData, post, postCreateEventData } from "../../common/src/type.ts";

const query = new queryStorage();

const app = express();
app.use(bodyPaser.json())
app.use(cors())

app.get("/query", (req, res) => {
  res.json(query.getAllQuery());
});

app.post("/events", (req, res) => {
  console.log("Received event:", req.body.type);
  const {type, data} = req.body;
  if (type === 'PostCreated') {
    query.addPost(data as postCreateEventData);
  }
  if (type === 'CommentCreated') {
    data as commentCreateEventData;
    query.addComment(data.postId, data.comment);
  }
  if (type === 'CommentUpdated') {
    data as commentCreateEventData;
    query.updateComment(data.postId, data.comment);
  }
  res.json({});
})

app.listen(process.env.MICRO_APP_QUERY_PORT, () => {
  console.log(`Server is running on port ${process.env.MICRO_APP_QUERY_PORT}`);
})
