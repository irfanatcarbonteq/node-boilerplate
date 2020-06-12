const bcrypt = require("bcrypt");
const uuidv1 = require("uuid/v1");
class UserEntity {
  constructor(userID, name, email) {
    this.userID = userID;
    this.name = name;
    this.email = email;
  }

  static createFromDetails(params) {
    const userObj = new UserEntity(uuidv1(), params.name, params.email);
    return userObj;
  }

  static createFromObject(obj) {
    const userObj = new UserEntity(obj.userID, obj.name, obj.email);
    return userObj;
  }

  async setPassword(password) {
    this.password = await bcrypt.hash(password, 10);
  }

  async setResetPasswordToken() {
    this.passwordResetToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const today = new Date();
    this.passwordResetExpires = today.setDate(today.getDate() + 1);
  }
}

module.exports = UserEntity;
