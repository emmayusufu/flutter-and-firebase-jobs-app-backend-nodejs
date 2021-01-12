const credentials = {
  apiKey: "d8c26078e16419ea3e6a4d241241b523e831468eaa8b4595db2882de57a0c406",
  username: "Workmannow",
};
const AfricasTalking = require("africastalking")(credentials);

const sms = AfricasTalking.SMS;

module.exports = {
  sms,
};
