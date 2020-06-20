const path = require("path");
const Email = require("email-templates");

class EmailUser {
  constructor(options, locals) {
    this.options = options;
    this.locals = locals;
  }

  async sendEmail() {
    const email = new Email({
      message: {
        from: "noreply@gmail.com",
      },
      // uncomment below to send emails in development/test env:
      //send: true,
      transport: {
        jsonTransport: true,
      },
    });
    email.send({
      template: path.join(__dirname, this.options.path),
      message: {
        to: this.options.to,
      },
      locals: this.locals,
    });
  }
}
module.exports = EmailUser;
