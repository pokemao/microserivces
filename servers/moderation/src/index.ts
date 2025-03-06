import express from "express";
import bodyPaser from "body-parser"
import cors from "cors"
import "dotenv/config";
import axios from "axios";
import { commentCreateEventData } from "../../common/src/index.ts";

const app = express();
app.use(bodyPaser.json())
app.use(cors())

app.post("/events", async (req, res) => {
  console.log("Received event:", req.body.type);
  const {type, data} = req.body;
  if (type === "CommentCreated") {
    data as commentCreateEventData;
    const status = req.body.data.content.includes("orange") ? "rejected" : "approved";
    // 模拟延迟
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
    await axios.post(process.env.MICRO_APP_EVENT_BUS_URL! + ':' + process.env.MICRO_APP_EVENT_BUS_PORT! + '/events', {
      type: 'CommentModerated',
      data: {
        postId: data.id,
        comment: {
          ...data.comment,
          status,
        }
      } as commentCreateEventData
    });
  }

  res.status(200).json({});
});

app.listen(process.env.MICRO_APP_EVENT_BUS_PORT, () => {
  console.log(`Server is running on port ${process.env.MICRO_APP_EVENT_BUS_PORT}`);
})
