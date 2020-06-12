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

exports.reset = async (params) => {
  const userIsPresent = await store.findByEmail(params.email);
  if (!userIsPresent) {
    throw new appError("User is not registered with given email", 400);
  }
  const user = UserEntity.createFromObject(userIsPresent);
  await user.setResetPasswordToken();
  const userWithResetPasswordToken = await store.update(user);
  userEventsListner.emit("resetPasswordRequest", userWithResetPasswordToken);
  return { user: userWithResetPasswordToken };
};

exports.updatePassword = async (params) => {
  const userIsPresent = await store.findByPasswordResetToken(
    params.passwordResetToken
  );

  if (!userIsPresent) {
    throw new appError("Invalid password reset token", 400);
  }

  if (Date.now() > userIsPresent.passwordResetExpires) {
    throw new appError("Token Expired", 400);
  }

  if (params.password === "" || params.confirmPassword === "") {
    throw new appError(
      "Password and confirm password can not be blanked.",
      400
    );
  }

  if (params.password !== params.confirmPassword) {
    throw new appError("Password and confirm password do not match.", 400);
  }

  const user = UserEntity.createFromObject(userIsPresent);
  await user.setPassword(params.password); //adding await due to bycrypt.
  const passwordUpdated = await store.update(user);
  if (passwordUpdated) {
    userEventsListner.emit("passwordUpdated", passwordUpdated);
    return { message: "Password updated successfully." };
  } else {
    throw new appError("Something went wrong.", 400);
  }
};
