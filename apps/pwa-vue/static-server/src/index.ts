/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { resolve } from 'path';

const app = express();
app.use(express.static(resolve(__dirname, '../')));

app.listen(process.env.MICRO_APP_CLIENT_PORT?.slice(1), () => {
  console.log(`Server is running on port ${process.env.MICRO_APP_CLIENT_PORT}`);
});
