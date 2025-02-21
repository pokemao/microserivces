import Taro from "@tarojs/taro";
import {Method} from "axios"

function settle(resolve, reject, res, failed){
  if (!failed) {
    resolve(res);
  } else {
    reject(res);
  }
}

const isStartWithSlash = (path: string) => {
  return /^\/(.*)/.test(path)
}

const isEndWithSlash = (path: string) => {
  return /(.*)\/$/.test(path)
}

const buildUrl = (baseURL: string, url: string, params: Record<string, number | string | undefined | null>) => {
  let base = ''
  if(isEndWithSlash(baseURL)) {
    base = baseURL.slice(0, -1)
  }
  let path = ''
  if(isStartWithSlash(url)) {
    path = url.slice(1)
  }
  const search: Record<string, string> = Object.create(null)
  Reflect.ownKeys(params).forEach((key: string) => {
    const value = params[key]
    if(value === null || typeof value === 'undefined') {
      search[key] = ''
    }else{
      search[key] = String(value)
    }

  })
  return base + '/' + path + '?' + new URLSearchParams(search).toString()
}

// axios中没有导出config这个参数的类型
export default function taroAdapter(config: {
  baseURL: string;
  url: string;
  method: Method;
  data: Record<string, number | string | undefined | null>;
  params: Record<string, number | string | undefined | null>;
}) {
  const {baseURL, params, url, data, method} = config;
  // 我们只取Taro.request要用的，而且我们使用axios会注入的属性
  const newConfig: {
    url: string
  } = Object.create(null);
  // 拼接url
  newConfig.url = buildUrl(baseURL, url, params);

  return new Promise((resolve,reject)=>{
    Taro.request({
      ...config,
      url: config.baseURL + config.url,
      data: config.data,
      method: method.toUpperCase(),
      header: config.headers,
      timeout: config.timeout,
      success: function (res) {
        var response = {
          ...res,
          status: res.statusCode,
          statusText: res.errMsg,
          headers: res.header,
          config: config,
          request: null
        };

        settle(resolve, reject, response, false);
      },
      fail:function (res) {
        var response = {
          ...res,
          // status: res.statusCode,
          statusText: res.errMsg,
          // headers: res.header,
          config: config,
          request: null
        };

        settle(resolve, reject, response, true);
      }
    })
  })
}
