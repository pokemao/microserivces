/**
 * 防抖相关类型
 */
export interface DebounceOptions {
  /**
   * 永远使用首次执行的结果
  @default false
  */
  readonly leading?: boolean;

  /**
   * 最后执行
  @default true
  */
  readonly trailing?: boolean;
}

const DEBOUNCE_DEFAULTS: DebounceOptions = {
  trailing: true,
};

async function _applyPromised(fn: (...args: any[]) => any, _this: unknown, args: any[]) {
  return await fn.apply(_this, args);
}

export function debounce<ArgumentsT extends unknown[], ReturnT>(
  fn: (...args: ArgumentsT) => PromiseLike<ReturnT> | ReturnT,
  wait = 25,
  options: DebounceOptions = {}
) {
  options = { ...DEBOUNCE_DEFAULTS, ...options };

  let leadingValue: PromiseLike<ReturnT> | ReturnT;

  let timeout: ReturnType<typeof setTimeout> | 0 | -1 = 0;

  let resolveList: Array<(val: any) => void> = [];

  let currentPromise: Promise<ReturnT> | null;

  let trailingArgs: any[] | null;

  const applyFn = (_this: any, args: any[]) => {
    currentPromise = _applyPromised(fn, _this, args);
    currentPromise.finally(() => {
      currentPromise = null;
      if (options.trailing && trailingArgs && !timeout) {
        const promise = applyFn(_this, trailingArgs);
        trailingArgs = null;
        return promise;
      }
    });
    return currentPromise;
  };

  return function (this: any, ...args: ArgumentsT) {
    if (currentPromise) {
      if (options.trailing) {
        trailingArgs = args;
      }
      return currentPromise;
    }
    return new Promise<ReturnT>((resolve) => {
      const shouldCallNow = !timeout && options.leading;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = -1;
        const promise = options.leading ? leadingValue : applyFn(this, args);
        for (const _resolve of resolveList) {
          _resolve(promise);
        }
        resolveList = [];
      }, wait);

      if (shouldCallNow) {
        leadingValue = applyFn(this, args);
        resolve(leadingValue);
      } else {
        resolveList.push(resolve);
      }
    });
  };
}
