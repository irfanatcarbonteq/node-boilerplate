const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const applicationBinding = require("../../App/Application/utils/applicationBinding");
const CreateUserCommand = require("../../App/Application/user/CreateUserCommand");

const commandBus = new CommandBus([
  new LoggerMiddleware(console),
  applicationBinding,
]);

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const command = new CreateUserCommand(name, email, password);
    await commandBus.handle(command);
    req.flash("info", "Signed Up successfully.");
    res.redirect("/login");
  } catch (e) {
    const { name, email } = req.body;
    req.flash("error", e.message);
    res.render("signup", {
      csrfToken: req.csrfToken(),
      name: name,
      email: email,
    });
  }
};
