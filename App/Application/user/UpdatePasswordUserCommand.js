const { Command } = require("simple-command-bus");
class UpdatePasswordUserCommand extends Command {
  constructor(passwordResetToken, password, confirmPassword) {
    super();
    this.passwordResetToken = passwordResetToken;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
  async userDetails() {
    return {
      passwordResetToken: this.passwordResetToken,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };
  }
}
module.exports = UpdatePasswordUserCommand;
