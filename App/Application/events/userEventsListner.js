const EmailUser = require("../../Infrastructure/mailer/UserMailer");
const { EventEmitter } = require("events");
const userEventsListner = new EventEmitter();

userEventsListner.on("userIsRegistered", (user) => {
  new EmailUser(
    user.email,
    "Registration Successfull",
    "You have registered successfully"
  ).userRegistrationEmail();
});

userEventsListner.on("passwordUpdated", (user) => {
  new EmailUser(
    user.email,
    "Password Updated Successfull",
    "Password is updated successfully"
  ).userPasswordUpdated();
});

module.exports = userEventsListner;
