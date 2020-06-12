const userService = require("../../Domain/services/user");
class UserHandler {
  async handleCreateUserCommand(command) {
    return await userService.create(command.userDetails());
  }
  async handleResetPasswordUserCommand(command) {
    return await userService.reset(command.userDetails());
  }
  async handleUpdatePasswordUserCommand(command) {
    return await userService.updatePassword(await command.userDetails());
  }
}

module.exports = UserHandler;
