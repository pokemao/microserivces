const path = require('path');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
// const { getOptions } = require('loader-utils');

module.exports = function debugerLoader(source) {
  console.log('【Debug Loader】处理文件:', this.resourcePath);
  // 获取 loader 配置选项
  // const options = getOptions(this) || {};
  const outputPath = path.resolve(__dirname, 'loader-output');

  // 确保输出目录存在
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // 生成唯一文件名（根据资源路径）
  const filename = path.basename(this.resourcePath);
  const debugFile = path.join(outputPath, `${filename}.debug`);

  // 写入文件（同步写入，生产环境慎用）
  fs.writeFileSync(debugFile, source);

  // 可选：控制台输出提示
  console.log(`\nLoader output written to: ${debugFile}`);

  // 原样返回源内容，不影响后续处理
  return source;
};
