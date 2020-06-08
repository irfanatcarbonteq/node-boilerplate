const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: [true, "can't be blank"],
    unique: true
  },
  name: {
    type: String,
    required: [true, "can't be blank"],
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
    minlength: 6,
    maxlength: 255
  },
  createdAt: { type: Date, default: Date.now },
  //give different access rights if admin or not
  isAdmin: Boolean
});

const User = mongoose.model("User", UserSchema);

module.exports = User;