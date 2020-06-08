const bunyan = require("bunyan");
module.exports = bunyan.createLogger({
  name: "Todo Application",
  streams: [
    {
      level: "debug",
      stream: process.stdout
    },
    {
      level: "info",
      stream: process.stdout
    }
  ]
});
