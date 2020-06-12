const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const commandHandlerMiddleware = require("../../App/Application/utils/applicationBinding");
const resetPasswordUserCommand = require("../../App/Application/user/ResetPasswordUserCommand");
const updatePasswordUserCommand = require("../../App/Application/user/UpdatePasswordUserCommand");

const commandBus = new CommandBus([
  new LoggerMiddleware(console),
  commandHandlerMiddleware,
]);

exports.reset = async (req, res) => {
  try {
    const { email } = req.body;
    const command = new resetPasswordUserCommand(email);
    await commandBus.handle(command);
    req.flash("info", "Check your email.");
    res.redirect("/");
  } catch (e) {
    req.flash("error", e.message);
    res.render("password", { csrfToken: req.csrfToken() });
  }
};

exports.update = async (req, res) => {
  const { token, password, confirmpassword } = req.body;
  try {
    const command = new updatePasswordUserCommand(
      token,
      password,
      confirmpassword
    );
    await commandBus.handle(command);
    req.flash("info", "Password Updated Successfully.");
    res.redirect("/");
  } catch (e) {
    req.flash("error", e.message);
    res.render("updatepassword", { token: token });
  }
};
