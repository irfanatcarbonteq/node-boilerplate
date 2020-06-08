const { mailer } = require("../config")
const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: mailer.email,
    pass: mailer.password
  }
});
module.exports = transporter;
