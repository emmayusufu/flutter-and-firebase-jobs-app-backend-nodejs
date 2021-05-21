const sharp = require("sharp");
const Helpers = require("./helpers");
const { imageDimensions } = require("./constants");

class ImageStorage extends Helpers{
  constructor(image) {
      super();
      this.image = image;
      // this.next =next
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
          .catch((err) =>  new Error(err));
      })
    )
      .then((data) => {
        data.push({ original: `./${image.path}` });
          return super.arrayToObject(data);
      })
      .catch((err) => new Error(err));
  }
}

module.exports = ImageStorage;
