const User = require("../../models/sequelize/User");
const UserEntity = require("../../../Domain/entities/User");

class SequelizeUserStore {
  async add(user) {
    const newUser = await User.create(user);
    return UserEntity.createFromObject(newUser);
  }

  async findByUserID(userID) {
    const user = await User.findOne({ where: { userID: userID } });
    if (user) {
      return UserEntity.createFromObject(user);
    }
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email: email } });
  }
}
module.exports = SequelizeUserStore;
