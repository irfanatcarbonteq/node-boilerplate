const mongoose = require("mongoose");
const { db } = require("../../App/Infrastructure/config");
mongoose.connect(db.host);

beforeEach(done => {
  console.log("Clear database", db.host);
  try {
    mongoose.connection.db.dropDatabase(function (err, result) {
      done();
    });
  } catch (e) {
    done();
    console.log(e);
  }
});
