// const path = require("path");
// const Datauri = require("datauri/parser");
// const { bucket } = require("../firebase/admin_config");

// exports.toBase64 = (file) => {
//   const dUri = new Datauri();
//   const dataUri = dUri.format(
//     path.extname(file.originalname).toString(),
//     file.buffer
//   );
//   return dataUri.content;
// };

// exports.getImageUrl = async function (image) {
//   const bucketFile = bucket.file(image.originalname);
//   await bucketFile.save(image.buffer, {
//     contentType: image.mimetype,
//     gzip: true,
//   });

//   const [url] = await bucketFile.getSignedUrl({
//     action: "read",
//     expires: "01-01-2050",
//   });
//   return url;
// };

const multer = require("multer")
const fs = require("fs")

exports.arrayToObject = (array) => {
  const object = {};
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const key = Object.keys(element)[0];
    const property = Object.values(element)[0];
    object[key] = property;
  }
  return object;
};
exports.generateOtp = (length) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.multerFileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
