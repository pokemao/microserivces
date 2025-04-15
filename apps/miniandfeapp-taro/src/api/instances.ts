import axios, { AxiosInstance } from 'axios'
import { debug } from '@/utils/index'
// import debug from 'debug'
import taroAdapter from './taroAdapter'

const syzlog = debug('microservices:apps:miniandfeapp:src:api:instances.ts')

class Instances {
  postInstance: AxiosInstance
  commentInstance: AxiosInstance
  queryInstance: AxiosInstance
  instances: AxiosInstance[]
  constructor() {
    this.instances = [
      this.postInstance = axios.create({
        baseURL: process.env.MICRO_APP_POSTS_PROTOCOL! + process.env.MICRO_APP_POSTS_HOST! +  process.env.MICRO_APP_POSTS_PORT!,
        timeout: 5000,
        adapter: taroAdapter,
      }),
      this.commentInstance = axios.create({
        baseURL: process.env.MICRO_APP_COMMENTS_PROTOCOL! + process.env.MICRO_APP_COMMENTS_HOST! +  process.env.MICRO_APP_COMMENTS_PORT!,
        timeout: 5000,
        adapter: taroAdapter,
      }),
      this.queryInstance = axios.create({
        baseURL: process.env.MICRO_APP_QUERY_PROTOCOL! + process.env.MICRO_APP_QUERY_HOST! +  process.env.MICRO_APP_QUERY_PORT!,
        timeout: 5000,
        adapter: taroAdapter,
      })
      // 添加instance
    ]
    this.instances.forEach(instance => {
      instance.interceptors.response.use((res) => {
        syzlog('postInstance request res', res)
        return res.data
      }, (error) => {
        syzlog('postInstance request error', error)
        return Promise.reject(error)
      })
    })
  }
}

export const instance = new Instances()
