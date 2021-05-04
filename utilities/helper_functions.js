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
const fsAsync = require("fs").promises

exports.arrayToObject = (array) => {
  const object = {};
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const key = Object.keys(element)[0];
    object[key] = Object.values(element)[0];
  }
  return object;
};
exports.generateOtp = (length) => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.multerFileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("./public/images")) {
      fs.mkdirSync("./public/images");
    }
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    fs.access('./public/images' + file.originalname, function(exists) {
      let uploadedFileName;
      if (exists) {
          uploadedFileName = Date.now() + '.' + file.originalname;
      } else {
          uploadedFileName = file.originalname;
      } 
      cb(null, uploadedFileName)
  });
  },
});

exports.deleteFile = async(filePath)=>{
  return await fsAsync.unlink(filePath)
}