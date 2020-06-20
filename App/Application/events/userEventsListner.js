const EmailUser = require("../../Infrastructure/mailer/UserMailer");
const { application } = require("../../Infrastructure/config");
const { EventEmitter } = require("events");
const userEventsListener = new EventEmitter();

userEventsListener.on("userIsRegistered", (user) => {
  new EmailUser(
    { to: user.email, path: "registration" },
    { name: user.name }
  ).sendEmail();
});

userEventsListener.on("resetPasswordRequest", (user) => {
  new EmailUser(
    { to: user.email, path: "resetpassword" },
    {
      resetPasswordLink: `${application.hostingUrl}/updatepassword?token=${user.passwordResetToken}`,
    }
  ).sendEmail();
});

userEventsListener.on("passwordUpdated", (user) => {
  new EmailUser({ to: user.email, path: "updatepassword" }, {}).sendEmail();
});

module.exports = userEventsListener;
