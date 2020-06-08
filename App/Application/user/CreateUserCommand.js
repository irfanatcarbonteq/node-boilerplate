const { Command } = require("simple-command-bus");
class CreateUserCommand extends Command {
  constructor(name, email, password) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }
  // write getter here.
  userDetails() {
    return {
      name: this.name,
      email: this.email,
      password: this.password
    };
  }
}
module.exports = CreateUserCommand;
