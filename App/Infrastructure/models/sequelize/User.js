const { db } = require("../../config")
const Sequelize = require('sequelize');
const sequelize = new Sequelize(db.host);
class User extends Sequelize.Model { }
User.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userID: {
    type: Sequelize.STRING,
    allowNull: false,
    require: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    require: true
  },
  email: {
    type: Sequelize.STRING,
    require: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    require: true,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: true
});
User.sync();
module.exports = User;