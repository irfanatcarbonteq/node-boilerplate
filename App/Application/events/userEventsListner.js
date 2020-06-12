const EmailUser = require("../../Infrastructure/mailer/UserMailer");
const { application } = require("../../Infrastructure/config");
const { EventEmitter } = require("events");
const userEventsListener = new EventEmitter();

userEventsListener.on("userIsRegistered", (user) => {
  new EmailUser(
    user.email,
    "Registration Successfully",
    "You have registered successfully"
  ).sendEmail();
});

userEventsListener.on("resetPasswordRequest", (user) => {
  new EmailUser(
    user.email,
    "Reset Password",
    `Click the following <a href="${application.host}/updatepassword?token=${user.passwordResetToken}">link</a> to update password`
  ).sendEmail();
});

userEventsListener.on("passwordUpdated", (user) => {
  new EmailUser(
    user.email,
    "Password Updated Successfully",
    "Password is updated successfully"
  ).sendEmail();
});

module.exports = userEventsListener;
