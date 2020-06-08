const JwtAuthService = require("../../Infrastructure/services/JwtAuthService");
const UserEntity = require("../entities/User");
const appError = require("../../../HTTP/errors/appError");
const userEventsListner = require("../../Application/events/userEventsListner");
const UserFactory = require("../../Infrastructure/factories/UserFactory");
const store = UserFactory.buildUserStore();

exports.current = async (userID) => {
  return await store.findByUserID(userID);
};

exports.authUser = async (params) => {
  const jwtAuthService = new JwtAuthService();
  const userIsPresent = await store.findByEmail(params.email);
  if (userIsPresent) {
    return { token: jwtAuthService.generateJwtToken(userIsPresent.userID) };
  }
  const user = UserEntity.createFromDetails(params); //Create a user entity first.
  await user.setPassword(params.password); //adding await due to bcrypt.
  const newUser = await store.add(user);
  userEventsListner.emit("userIsRegistered", newUser);
  return { token: jwtAuthService.generateJwtToken(user.userID) };
};

exports.create = async (params) => {
  const userIsPresent = await store.findByEmail(params.email);
  if (userIsPresent) {
    throw new appError("Specified E-Mail is already taken", 400);
  }
  const user = UserEntity.createFromDetails(params);
  await user.setPassword(params.password); //adding await due to bcrypt.
  const newUser = await store.add(user);
  userEventsListner.emit("userIsRegistered", newUser);
  return { user: newUser };
};

exports.updatePassword = async (params) => {
  const userFromDb = await store.findByUserID(params.userID);
  const user = UserEntity.createFromObject(userFromDb);
  await user.setPassword(params.password); //adding await due to bycrypt.
  const passwordUpdated = await store.update(user);
  if (passwordUpdated) {
    userEventsListner.emit("passwordUpdated", passwordUpdated);
    return { message: "Password updated successfully." };
  } else {
    throw new appError("Something went wrong.", 400);
  }
};
