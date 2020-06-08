const transporter = require("./transporter");

class EmailUser {
  constructor(to, subject, text) {
    this.mailOptions = {
      from: "noreply@gmail.com",
      to: to,
      subject: subject,
      text: text
    }
  }

  async userRegistrationEmail() {
    await transporter.sendMail(this.mailOptions);
  }

  async userPasswordUpdated() {
    await transporter.sendMail(this.mailOptions);
  }

};
module.exports = EmailUser;