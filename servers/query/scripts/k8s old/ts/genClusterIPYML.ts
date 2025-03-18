import fs from 'node:fs';
import { resolve } from 'node:path'
import jsyaml from 'js-yaml';
import { fileURLToPath } from "node:url";
import { getYMLFileOutputName } from './utils';
const __filename = fileURLToPath(import.meta.url);

const clusterIPServiceJSON = {
  "apiVersion": "v1",
  "kind": "Service",
  "metadata": {
    "name": process.env.MICRO_APP_QUERY_HOST!,
  },
  "spec": {
    "type": "ClusterIP",
    "selector": {
      [process.env.MICRO_APP_LABEL_KEY1!]: process.env.MICRO_APP_QUERY_LABEL_VALUE1!,
    },
    "ports": [
      {
        "name": "query",
        "protocol": "TCP",
        "port": +process.env.MICRO_APP_QUERY_PORT!.slice(1),
        "targetPort": +process.env.MICRO_APP_QUERY_PORT!.slice(1),
      }
    ]
  }
}

// json转yaml
const yamlString = jsyaml.dump(clusterIPServiceJSON);

// 生成存储yaml文件的文件夹
const dirPath = './k8s-yaml';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const tmp = getYMLFileOutputName(__filename)
if (!tmp) {
  console.log(`${__filename} 文件名错误`);
  process.exit(1)
}

const fileName = `${tmp}.yaml`;
const filePath = resolve(dirPath, fileName);

// 写入yaml文件
fs.writeFileSync(filePath, yamlString, {
  flag: 'w',
});
