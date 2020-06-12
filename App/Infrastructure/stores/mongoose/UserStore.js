const User = require("../../models/mongoose/User");
const UserEntity = require("../../../Domain/entities/User");

class MongooseUserStore {
  static buildStore() {
    return new MongooseUserStore();
  }

  async add(user) {
    const newUser = await User.create(user);
    return UserEntity.createFromObject(newUser);
  }

  async findByUserID(userID) {
    const user = await User.findOne({ userID: userID });
    if (user) {
      return UserEntity.createFromObject(user);
    }
  }

  async findByPasswordResetToken(passwordResetToken) {
    const user = await User.findOne({ passwordResetToken: passwordResetToken });
    if (user) {
      return UserEntity.createFromObject(user);
    }
  }

  async findByEmail(email) {
    return await User.findOne({ email: email });
  }

  async update(user) {
    return await User.findOneAndUpdate({ userID: user.userID }, user, {
      new: true, // this will return the updated document
    });
  }

  async userIsPresent(userID) {
    return await User.exists({ userID: userID });
  }

  async first() {
    const users = await User.find({}).limit(1);
    return users.map((user) => UserEntity.createFromObject(user));
  }

  async count() {
    return await User.count();
  }
}
module.exports = MongooseUserStore;
