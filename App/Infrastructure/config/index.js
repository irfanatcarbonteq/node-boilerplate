const application = require("./application");
const database = require("./database");
const mailer = require("./gmail");
module.exports = {
  db: database,
  application: application,
  mailer: mailer,
};
