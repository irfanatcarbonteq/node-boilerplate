const userService = require("../../Domain/services/User");
const { Command } = require("simple-command-bus");
class UpdatePasswordUserCommand extends Command {
  constructor(userID, password) {
    super();
    this.userID = userID;
    this.password = password;
  }
  async execute() {
    return await userService.updatePassword(this);
  }
}
module.exports = UpdatePasswordUserCommand;
