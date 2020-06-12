const userService = require("../../Domain/services/user");
const { Command } = require("simple-command-bus");
class ResetPasswordUserCommand extends Command {
  constructor(email) {
    super();
    this.email = email;
  }

  userDetails() {
    return { email: this.email };
  }
}
module.exports = ResetPasswordUserCommand;
