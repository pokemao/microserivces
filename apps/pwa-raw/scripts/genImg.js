const sharp = require('sharp');
const {resolve} = require('path');

// 使用sharp这个工具剪裁图片尺寸为 [48,72,96,144,168,192]

const genImg = (imgPath, width, height, outDir) => {
  sharp(imgPath).resize(width, height).png({ quality: 75 }).toFile(resolve(outDir, `${width === height ? width : '' + width + height}.png`))
}

const imgPath = resolve(__dirname, '../assets/honeysuckle.png');
const outDir = resolve(__dirname, '../static/assets');

const sizeList = [[48, 48], [72, 72], [96, 96], [144, 144], [168, 168], [192, 192], [540, 720], [720, 540]];

sizeList.forEach(([width, height]) => {
  try {
    genImg(imgPath, width, height, outDir)
  }catch (e) {
    console.log(e)
  }
})


