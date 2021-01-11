const credentials = {
  apiKey: "0f811f30498d06d5b1fc5b3825a2d351452954a2c9d0f1e22407dbb3bf442543",
  username: "kimaswa",
};
const AfricasTalking = require("africastalking")(credentials);

const sms = AfricasTalking.SMS;

module.exports = {
  sms,
};
