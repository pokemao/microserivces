import {randomBytes} from "crypto";
import express from "express";
import bodyPaser from "body-parser"
import cors from "cors"
import 'dotenv/config';
import QueryStorage from "./queryStorage.ts";
import { handleEvent, syncEvents } from "./utils.ts";
import axios from "axios";
import { eventType } from "../../common/src/type.ts";
import EventStorage from "./eventStorage.ts";
import esbuildPluginEnv from "@microservices/esbuild-plugin-env";

const query = new QueryStorage();
const handledEvents = new EventStorage()

const app = express();
app.use(bodyPaser.json())
app.use(cors())

app.get("/query", (req, res) => {
  res.json(query.getAllQuery());
});

app.post("/events", (req, res) => {
  console.log("Received event:", req.body.type);
  handleEvent(query, handledEvents, req.body);
  res.json({});
})

app.listen(esbuildPluginEnv.MICRO_APP_QUERY_PORT!.slice(1), () => {
  syncEvents(query, handledEvents);
  console.log(`Server is running on port ${esbuildPluginEnv.MICRO_APP_QUERY_PORT}`);
})
