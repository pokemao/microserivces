import axios from "axios"

class HttpMethods {
  get = async (instance: ReturnType<typeof axios.create>, path: string, params?: Record<string, unknown>) => {
    // params是拼接在url后面的参数
    return instance.get(path, {
      params
    })
  }
  post = async (instance: ReturnType<typeof axios.create>, path: string, body: Record<string, unknown>, params?: Record<string, unknown>) => {
    // params是拼接在url后面的参数
    // body是请求体
    return instance.post(path, {
      params,
      body
    })
  }
}

export const http = new HttpMethods()
