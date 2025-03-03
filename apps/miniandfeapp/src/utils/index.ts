import { AxiosResponse } from "axios";

export const to = <T>(promise: Promise<T> | PromiseLike<T>): Promise<[null, T] | [T, null]> => {
  if ("then" in promise && "catch" in promise) {
    return promise
      .then<[null, T]>((data) => [null, data])
      .catch<[T, null]>((err) => [err, null]);
  }
  if ("then" in promise) {
    return Promise.resolve(promise)
      .then<[null, T]>((data) => [null, data])
      .catch<[T, null]>((err) => [err, null]);
  }
  return Promise.resolve([null, promise]);
}


/**
 * 防抖相关类型
 */
export interface DebounceOptions {
  timeoutTime?: number; // 单位ms
}

// 只有上一个promise执行完才会执行下一个promise
async function _applyPromised(this: unknown, fn: (...args: unknown[]) => unknown, args: unknown[]) {
  return await fn.apply(this, args);
}

export function debounce<F extends (...args: unknown[]) => PromiseLike<AxiosResponse> | AxiosResponse>(
  fn: F,
  options: DebounceOptions = {}
): (...args: Parameters<F>) => Promise<ReturnType<F>> {
  // 默认5s，promise没有执行完毕就强制结束
  const { timeoutTime = 5000 } = options;

  let timeout: ReturnType<typeof setTimeout> | null = null;

  let currentPromise: Promise<ReturnType<F>> | null;

  return async function (...args: Parameters<F>) {
    return new Promise<ReturnType<F>>(async (resolve, reject) => {
      if (currentPromise) {
        return currentPromise.then(resolve, reject);
      }
      // 到这里说明不存在currentPromise，那么上一次的计时器就没有用了
      if (timeout) {
        clearTimeout(timeout);
      }
      // 到时间了就表示这个promise已经执行失败了
      setTimeout(() => {
        timeout = null;
        currentPromise = null;
        // TODO待修改
        reject({
          data: {},
          status: -1,
          statusText: 'promise超时',
          headers: {}, // 响应头
          config: {},
          request: {}
        });
      }, timeoutTime);
      currentPromise = _applyPromised.call(this, fn, args);
      currentPromise!.then(resolve, reject).finally(() => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = null;
        currentPromise = null;
      });
    })
  };
}

