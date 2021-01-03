const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "workman",
  api_key: "514111897351468",
  api_secret: "H35ClJYKIlPzPSIFKwzi1FEfs60",
});

exports.cloudinary = cloudinary;
