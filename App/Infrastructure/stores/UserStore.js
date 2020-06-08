class UserStore {
  static buildMongooseUserStore() {
    const MongooseUserStore = require("./mongoose/UserStore");
    return new MongooseUserStore();
  }

  static buildSequelizeUserStore() {
    const SequelizeUserStore = require("./sequelize/UserStore");
    return new SequelizeUserStore();
  }
}
module.exports = UserStore;
