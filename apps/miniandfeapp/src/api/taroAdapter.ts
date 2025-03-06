import Taro from "@tarojs/taro";
import {Method as axiosMethod, AxiosResponse} from "axios"

type adapterParams = {
  baseURL: string;
  url: string;
  method: axiosMethod;
  data: string;
  headers: any;
  timeout: number;
}

type taroRequestMethod = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT"

const isStartWithSlash = (path: string) => {
  return /^\/(.*)/.test(path)
}

const isEndWithSlash = (path: string) => {
  return /(.*)\/$/.test(path)
}

const adapterParamsFun = (config: adapterParams): {
  baseURL: string;
  url: string;
  method: taroRequestMethod;
  data: Record<string, unknown>;
  params: Record<string, unknown>;
  headers: any;
  timeout: number;
} => {
  const {baseURL, url, data: beforeData = '{}', method: axiosTypeMethod, headers, timeout} = config;
  const method = axiosTypeMethod.toUpperCase() as taroRequestMethod;

  const {params = {}, body = {}} = JSON.parse(beforeData) as {
    params?: Record<string, unknown>;
    body?: Record<string, unknown>;
  };

  return {
    baseURL,
    url,
    method,
    params,
    data: body,
    headers,
    timeout
  }
}

const buildUrl = (baseURL: string, url: string, params: Record<string, unknown>) => {
  let base = isEndWithSlash(baseURL) ? baseURL.slice(0, -1) : baseURL
  let path = isStartWithSlash(url) ? url.slice(1) : url
  const search: Record<string, string> = Object.create(null)
  Reflect.ownKeys(params).forEach((key: string) => {
    const value = params[key]
    if(value === null || typeof value === 'undefined') {
      search[key] = ''
    }else{
      search[key] = JSON.stringify(value)
    }
  })
  return base + '/' + path + '?' + new URLSearchParams(search).toString()
}

// axios中没有导出config这个参数的类型
export default function taroAdapter(config: adapterParams): Promise<AxiosResponse> {
  const { baseURL, url: path, params, data, method, headers, timeout } = adapterParamsFun(config)
  const url  = buildUrl(baseURL, path, params);

  // debugger
  return new Promise((resolve,reject)=>{
    Taro.request({
      url,
      data,
      method,
      header: headers,
      timeout,
      success: function (res) {
        const response: AxiosResponse = {
          data: res.data,
          status: res.statusCode,
          statusText: res.errMsg,
          headers: res.header, // 响应头
          config: Object.assign({}, config, {cookies: res.cookies}),
          request: {}
        };

        if(res.statusCode >= 200 && res.statusCode < 300) {
          resolve(response)
        }else{
          reject(response)
        }

      },
      fail:function (res: {
        errno: number;
        errMsg: string;
      }) {
        // 比如服务器没启动的情况就会进入到这个fail的状态
        const response: AxiosResponse = {
          data: {},
          status: res.errno == undefined ? -1 : res.errno,
          statusText: res.errMsg,
          headers: {}, // 响应头
          config: config,
          request: {}
        };

        reject(response)
      }
    })
  })
}
