const path = require("path");
const Datauri = require("datauri/parser");
const { bucket } = require("../firebase/admin_config");

exports.generateOtp = (length) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.toBase64 = (file) => {
  const dUri = new Datauri();
  const dataUri = dUri.format(
    path.extname(file.originalname).toString(),
    file.buffer
  );
  return dataUri.content;
};

exports.getImageUrl = async function (image) {
  const bucketFile = bucket.file(image.originalname);
  await bucketFile.save(image.buffer, {
    contentType: image.mimetype,
    gzip: true,
  });

  const [url] = await bucketFile.getSignedUrl({
    action: "read",
    expires: "01-01-2050",
  });
  return url;
};
