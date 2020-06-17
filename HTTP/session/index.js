const { db } = require("../../App/Infrastructure/config");

module.exports = (session) => {
  if (db.driver === "mongoose") {
    const MongoDBStore = require("connect-mongodb-session")(session);
    const store = new MongoDBStore({
      uri: db.host,
    });
    return store;
  }
  if (db.driver === "sequelize") {
    const Sequelize = require("sequelize");
    const SequelizeStore = require("connect-session-sequelize")(session.Store);
    const sequelize = new Sequelize(db.host);

    const store = new SequelizeStore({
      db: sequelize,
    });
    store.sync();
    return store;
  }
};
