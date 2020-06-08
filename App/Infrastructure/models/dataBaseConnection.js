const { db } = require("../config");
const mongoose = require("../models/mongoose/mongoose");
const sequelize = require("../models/sequelize/sequelize");
module.exports = () => {
  if (db.driver === "mongoose") {
    mongoose();
  }
  if (db.driver === "sequelize") {
    sequelize();
  }
}