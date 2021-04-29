const sharp = require("sharp");
const { imageDimensions } = require("./constants");
const { arrayToObject } = require("./helper_functions");

class ImageStorage {
  constructor(image) {
    this.image = image;
  }

  uploadImage() {
    const image = this.image;
    return Promise.all(
      imageDimensions.map((dimension) => {
        const path = `./public/images/${dimension.name}_${image.originalname}`;
        return sharp(image.path)
          .resize(dimension.size)
          .toFile(path)
          .then(() => {
            const obj = {};
            obj[dimension.name] = path;
            return obj;
          })
          .catch((err) =>  new Error("failed to resize and store image"));
      })
    )
      .then((data) => {
        data.push({ original: `./${image.path}` });
        const obj = arrayToObject(data);
        return obj;
      })
      .catch((err) => new Error("failed to complete"));
  }
}

module.exports = ImageStorage;
