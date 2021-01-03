const { OgenzoWidgets } = require("ogenzo-widgets");
const ogenzoWidgets = new OgenzoWidgets({
  smsConfig: {
    username: "EXCHANGER",
    apiKey: "940e53fc7990c0e47d3cd0ef4d3f56f3b8e85b5129e8bb285e46d0d13811529e",
  },
});

exports.sms = ogenzoWidgets.sms;
