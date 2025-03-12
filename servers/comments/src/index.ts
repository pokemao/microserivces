import {randomBytes} from "crypto";
import express from "express";
import bodyPaser from "body-parser"
import cors from "cors"
import commentsStorage from "./commentsStorage.ts";
/**
 * 这里不需要使用import "dotenv/config"
 * 大家可以看看esbuild目录中env插件的解释
 * process.env上的环境变量都是由turbo注入到进程上的，和dotenv没有关系，
 * 其实和dotenv有关系，不过是和turbo run build这个命令之前的dotenv -c development有关系，也就是和根目录的dotenv有关系，
 * 而和这里的import "dotenv/config"没有关系
 */
// import "dotenv/config";
import axios from "axios";
import { commentCreateEventData, commentStatus, eventType } from "../../common/src/type.ts";

// 这个是配合 esbuild 插件使用的，其实没有@microservices/esbuild-plugin-env这个npm包，为了防止ts报错，要在types目录下写@microservices/esbuild-plugin-env.d.ts类型声明文件
// 我们把types目录下写的@microservices/esbuild-plugin-env.d.ts类型声明文件移动到common中，为了让所有的server都能使用这个类型声明文件
import esbuildPluginEnv from "@microservices/esbuild-plugin-env";

let env: Record<string, string> = {}

if(process.env.NODE_ENV === 'production') {
  env = esbuildPluginEnv;
}else {
  env = env;
}

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

  const eventBusUrl = env.MICRO_APP_EVENT_BUS_URL! + ':' + env.MICRO_APP_EVENT_BUS_PORT! + '/events';
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
    const eventBusUrl = env.MICRO_APP_EVENT_BUS_URL! + ':' + env.MICRO_APP_EVENT_BUS_PORT! + '/events';
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

app.listen(env.MICRO_APP_COMMENTS_PORT, () => {
  console.log(`Server is running on port ${env.MICRO_APP_COMMENTS_PORT}`);
})
