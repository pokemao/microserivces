import express from "express";
import { resolve } from "path";
import esbuildPluginEnv from "@microservices/esbuild-plugin-env";

const app = express();
app.use(express.static(resolve(__dirname, "../")));

app.listen(esbuildPluginEnv.MICRO_APP_CLIENT_PORT!.slice(1), () => {
  console.log(`Server is running on port ${esbuildPluginEnv.MICRO_APP_CLIENT_PORT}`);
})
