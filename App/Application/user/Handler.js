const userService = require("../../Domain/services/User");
class UserHandler {
  async handleCreateUserCommand(command) {
    return await userService.create(command.userDetails());
  }
}

module.exports = UserHandler;
