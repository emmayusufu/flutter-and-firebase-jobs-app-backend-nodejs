const sharp = require("sharp");
const { imageDimensions } = require("../index");
const { arrayToObject } = require("../helper_functions");

class ImageStorage {
  constructor(image) {
    this.image = image;
  }

  uploadImage() {
    const image = this.image;
    return Promise.all(
      imageDimensions.map((dimension) => {
        const path = `./uploads/${dimension.name}_${image.originalname}`;
        return sharp(image.path)
          .resize(dimension.size)
          .toFile(path)
          .then(() => {
            const obj = {};
            obj[dimension.name] = path;
            return obj;
          })
          .catch((err) => console.log(err));
      })
    )
      .then((data) => {
        data.push({ original: `./${image.path}` });
        const obj = arrayToObject(data);
        return JSON.stringify(obj);
      })
      .catch((err) => console.log(err));
  }
}

module.exports = ImageStorage;
