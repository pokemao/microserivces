import axios, { AxiosInstance } from 'axios'
import taroAdapter from './taroAdapter'

class Instances {
  postInstance: AxiosInstance
  commentInstance: AxiosInstance
  instances: AxiosInstance[]
  constructor() {
    this.instances = [
      this.postInstance = axios.create({
        baseURL: process.env.MICRO_APP_POST_URL + (process.env.MICRO_APP_POST_PORT! ? ':' + process.env.MICRO_APP_POST_PORT : ''),
        timeout: 5000,
        adapter: taroAdapter,
      }),
      this.commentInstance = axios.create({
        baseURL: process.env.MICRO_APP_COMMENT_URL + (process.env.MICRO_APP_COMMENT_PORT!? ':' + process.env.MICRO_APP_COMMENT_PORT : ''),
        timeout: 5000,
        adapter: taroAdapter,
      }),
      // 添加instance
    ]
    this.instances.forEach(instance => {
      instance.interceptors.response.use((res) => {
        console.log('postInstance request res', res)
        return res.data
      }, (error) => {
        console.log('postInstance request error', error)
        return Promise.reject(error)
      })
    })
  }
}

export const instance = new Instances()
