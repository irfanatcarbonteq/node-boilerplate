const { mailer } = require("../config");
const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,

  auth: {
    user: mailer.email,
    pass: mailer.password,
  },
});
module.exports = transporter;
