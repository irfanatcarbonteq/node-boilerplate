const { db } = require("../../config");
const Sequelize = require('sequelize');
module.exports = () => {
  const sequelize = new Sequelize(db.host);
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}