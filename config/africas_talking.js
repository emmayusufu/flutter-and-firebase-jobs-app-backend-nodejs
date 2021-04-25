const credentials = {
    apiKey: "602022dd3121c119205415b38c2608da0fc611a607065b11216288b872d5591a",
    username: "emmajoe",
};
const AfricasTalking = require("africastalking")(credentials);

const sms = AfricasTalking.SMS;

module.exports = {
    sms,
};
