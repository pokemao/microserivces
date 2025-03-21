import fs from 'node:fs';
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from "node:url";
import jsyaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const reg = /(.*)JSON.ts$/i;

export const getYMLFileOutputName = (str: string) => {
  return str.match(reg)?.[1]?.toLowerCase();
}

type sameDirFilesType = {
  filename: string,
  outputname: string,
}
const sameDirFiles: sameDirFilesType[] = []

// 读取目录下的文件
// 当前的pwd是package.json所在的目录
// 所以这里使用__dirname —— 就是当前的目录
fs.readdirSync(__dirname).forEach(file => {
  const tmp = getYMLFileOutputName(file)
  if (tmp) {
    sameDirFiles.push({
      filename: file,
      outputname: tmp,
    });
  }
});

if(sameDirFiles.length === 0) {
  console.log('没有找到能够转成yaml的文件');
  process.exit(1)
}

// 生成存储yaml文件的文件夹，这个文件夹要求和package.json在同一个目录下
const dirPath = './k8s-yaml';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// eslint-disable-next-line @typescript-eslint/no-shadow
const JSON2YAML = (sameDirFiles: sameDirFilesType[]) => {
  sameDirFiles.forEach(({
    filename, outputname
  }) => {
    import(resolve(__dirname, filename)).then((module) => {
      const json = module.default;
      // eslint-disable-next-line import/no-named-as-default-member
      const yamlString = jsyaml.dump(json);
      const filePath = resolve(dirPath, `${outputname}.yaml`);
      fs.writeFile(filePath, yamlString, (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
          process.exit(1);
        }
        console.log(`File written successfully: ${filePath}`);
      })
    })
  })
}

JSON2YAML(sameDirFiles);
