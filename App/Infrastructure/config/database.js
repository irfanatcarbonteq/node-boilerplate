require('dotenv').config();
module.exports = {
  host: process.env.DATABASE_URL,
  driver: process.env.DATABASEDRIVER
};
