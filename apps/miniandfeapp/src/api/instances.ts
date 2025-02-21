import axios from 'axios'
import taroAdapter from './taroAdapter'

class Instances {
  postInstance = axios.create({
    baseURL: process.env.MICRO_APP_REQUEST_URL! + process.env.MICRO_APP_POST_PORT! ? ':' + process.env.MICRO_APP_POST_PORT : '',
    timeout: 5000,
    adapter: taroAdapter,
  })
  commentInstance = axios.create({
    baseURL: process.env.MICRO_APP_REQUEST_URL! + process.env.MICRO_APP_COMMENT_PORT!? ':' + process.env.MICRO_APP_COMMENT_PORT : '',
    timeout: 5000,
    adapter: taroAdapter,
  })
}

export const instance = new Instances()
