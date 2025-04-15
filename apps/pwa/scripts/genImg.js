const sharp = require('sharp');
const {resolve} = require('path');

// const genImg = (imgPath, size, outDir) => {
//   sharp(imgPath).resize(size, size).png({ quality: 75 }).toFile(resolve(outDir, `${size}.png`))
// }

// const imgPath = resolve(__dirname, '../assets/didi.png');
// const outDir = resolve(__dirname, '../static/assets');

// const sizeList = [48,72,96,144,168,192];

// sizeList.forEach(size => {
//   try {
//     genImg(imgPath, size, outDir)
//   }catch (e) {
//     console.log(e)
//   }
// })

const tiny = () => {
  const imgPath = resolve(__dirname, './schema.png');
  const outDir = resolve(__dirname, './res');
  sharp(imgPath).png({ quality: 1 }).toFile(resolve(outDir, `schema.png`))
}

tiny()
