const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const applicationBinding = require("../../../../App/Application/utils/applicationBinding");
const CreateUserCommand = require("../../../../App/Application/user/CreateUserCommand");
const handleError = require("../../../utils/handleError");

const commandBus = new CommandBus([
  new LoggerMiddleware(console),
  applicationBinding,
]);

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const command = new CreateUserCommand(name, email, password);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};
