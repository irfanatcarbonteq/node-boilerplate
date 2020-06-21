const faker = require("faker");
user = {
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password()
};
module.exports = user;
