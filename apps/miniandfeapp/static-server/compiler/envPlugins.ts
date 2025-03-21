/**
 * 这个插件是为了解决一个问题：
 * 使用build的时候打包出来的程序访问不到turbo插入到process.env中的内容
 *
 * 首先我理解这个问题的原因是：
 * 在 turbo run serve 的时候，由于是turbo启动的进程，turbo会在进程启动之前或者之后把环境变量插入到process.env中，
 * 然后fork之后的进程就可以正常访问到process.env中的内容了。
 * 但是 turbo run build 的时候，虽然也是urbo启动的进程，然后turbo会在进程启动之前或者之后把环境变量插入到process.env中，
 * 但是在 turbo 打包完毕之后这个进程环境就消失了，之后我们独自启动打包之后的程序，就无法访问到process.env中的内容了，因为这个我们独自启动的进程没有对process.env进行注入。
 *
 * 但是对于子包taro打包的程序来说，在build之后也是可以访问到我们写的process.env.xxx的值的，原因就是：taro打包的时候对process.env.xxx进行了字符串替换。
 * 所以我们这里模仿taro，webpack，vite等打包工具的做法，在 turbo run build 的时候，把turbo注入到process.env中的内容，直接字符串替换到代码中
 */

export const envPlugin = {
  name: "envPlugin",
  setup(build: any) {
    // Intercept import paths called "env" so esbuild doesn't attempt
    // to map them to a file system location. Tag them with the "env-ns"
    // namespace to reserve them for this plugin.
    build.onResolve({ filter: /^@microservices\/esbuild-plugin-env$/ }, (args: { path: any; }) => ({
      path: args.path,
      namespace: 'env-ns',
    }))

    // Load paths tagged with the "env-ns" namespace and behave as if
    // they point to a JSON file containing the environment variables.
    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
      contents: JSON.stringify(process.env),
      loader: 'json',
    }))
  }
}
