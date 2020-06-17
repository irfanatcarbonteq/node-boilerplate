const { application } = require("../../Infrastructure/config");
const bunyan = require("bunyan");
module.exports = bunyan.createLogger({
  name: application.applicationName,
  streams: [
    {
      level: "debug",
      stream: process.stdout,
    },
    {
      level: "info",
      stream: process.stdout,
    },
  ],
});
