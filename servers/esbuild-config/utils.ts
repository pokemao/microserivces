import { rmSync } from "node:fs";
import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDirname = () => {
  return __dirname;
};

export const asserts = (mode: string) => {
  const lowerMode = mode.toLocaleLowerCase();
  if (lowerMode === "production" || lowerMode === "development") {
    return;
  } else {
    console.error("未知是开发模式还是生产模式");
    process.exit(1);
  }
};

export const clearBundle = (path: string) => {
  const dir: string = resolve(__dirname, "../", path);
  try {
    rmSync(dir, { recursive: true, force: true });
    console.log(`'${dir}' folder has been deleted.`);
  } catch (error) {
    console.error(`Error while deleting '${dir}': `, error);
    process.exit(1);
  }
};

export interface buildPath {
  inPath: string;
  outPath: string;
}
