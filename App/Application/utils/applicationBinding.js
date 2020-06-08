const {
  CommandHandlerMiddleware,
  ClassNameExtractor,
  InMemoryLocator,
  //HandleInflector //It only handles handle method.
} = require("simple-command-bus");
const ClassNameInflector = require("./ClassNameInflector");
const UserHandler = require("../user/Handler");
const commandHandlerMiddleware = new CommandHandlerMiddleware(
  new ClassNameExtractor(),
  new InMemoryLocator({
    CreateUserHandler: new UserHandler(),
    UpdatePasswordUserHandler: new UserHandler(),
  }),
  new ClassNameInflector()
);

module.exports = commandHandlerMiddleware;
