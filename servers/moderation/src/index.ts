import express from "express";
import bodyPaser from "body-parser"
import cors from "cors"
import axios from "axios";
import { randomBytes } from "crypto";
import { commentCreateEventData } from "../../common/src/index.ts";

const app = express();
app.use(bodyPaser.json())
app.use(cors())

app.post("/events", async (req, res) => {
  console.log("Received event:", req.body.type);
  const {type, data} = req.body;
  /**
   * moderation流程：
   * 1. comment服务收到 CommentCreated 事件
   * 2. comment服务发送event到event bus
   * 3. event bus纷发 CommentCreated 事件到所有服务
   * 4. moderation服务收到 CommentCreated 事件
   * 5. moderation服务处理 CommentCreated 事件
   * 6. moderation服务发送 CommentModerated 事件到event bus
   * 7. event bus纷发 CommentModerated 事件到所有服务
   * 8. comment服务收到 CommentModerated 事件
   * 9. comment服务处理 CommentModerated 事件
   * 10. comment服务发送 CommentUpdated 事件到event bus
   * 11. event bus纷发 CommentUpdated 事件到所有服务
   * 12. query服务收到 CommentUpdated 事件
   * 13. query服务处理 CommentUpdated 事件
   *
   * 这么做的原因是 把所有comment改变的逻辑都放在了comment服务中，这样就能把comment相关的功能收口到comment服务中，
   * 而且这样就能操作comment服务中的数据库了，
   * 而不是在moderation服务中操作comment服务中的数据库，
   * 这样就可以保证comment服务中的数据库的一致性，
   * 然后再把改变的comment通知给query服务，
   * 然后query服务再去更新自己的数据库，保证数据的一致性
   */
  if (type === "CommentCreated") {
    const {postId, comment: {id, content}} = data as commentCreateEventData;
    const status = content.includes("orange") ? "rejected" : "approved";
    // 模拟延迟
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
    axios.post(process.env.MICRO_APP_EVENT_BUS_URL! + ':' + process.env.MICRO_APP_EVENT_BUS_PORT! + '/events', {
      id: randomBytes(4).toString("hex"),
      type: 'CommentModerated',
      data: {
        postId: postId,
        comment: {
          id,
          content,
          status,
        }
      } as commentCreateEventData
    });
  }

  res.status(200).json({});
});

app.listen(process.env.MICRO_APP_MODERATION_PORT, () => {
  console.log(`Server is running on port ${process.env.MICRO_APP_MODERATION_PORT}`);
})
