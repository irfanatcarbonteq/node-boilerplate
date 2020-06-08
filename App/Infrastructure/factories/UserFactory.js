const Factory = require("./Factory");
const UserStore = require("../stores/UserStore");
class UserFactory extends Factory {
  static buildUserStore() {
    if (this.isMongooseDriver()) {
      return UserStore.buildMongooseUserStore();
    } else if (this.isSequelizeDriver()) {
      return UserStore.buildSequelizeUserStore();
    }
  }
}
module.exports = UserFactory;
