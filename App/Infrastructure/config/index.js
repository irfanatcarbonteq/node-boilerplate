const application = require("./application");
const database = require("./database");
const mailer = require("./gmail");
const amazon = require("./amazon");
const applicationSecretKey = require("./applicationSecretKey");
module.exports = {
  db: database,
  application: application,
  mailer: mailer,
  applicationSecretKey: applicationSecretKey(),
};
