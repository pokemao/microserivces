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
