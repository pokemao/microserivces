import {randomBytes} from "crypto";
import express from "express";
import bodyPaser from "body-parser"
import cors from "cors"
import 'dotenv/config';

const app = express();
app.use(bodyPaser.json())
app.use(cors())

app.get("/posts", (req, res) => {
  res.json({});
});

app.post("/events", (req, res) => {
  console.log("Received event:", req.body.type);
  const events = req.body;
  res.json({});
})

app.listen(process.env.MICRO_APP_QUERY_PORT, () => {
  console.log(`Server is running on port ${process.env.MICRO_APP_QUERY_PORT}`);
})
