const expect = require("chai").expect;
const sinon = require("sinon");
const userService = require("../../../App/Domain/services/user");
const fakeUserObject = require("../../fakeObjects/user");
const passwordController = require("../../../HTTP/controllers/password");
let user = {};

describe("Password Controller.", () => {
  beforeEach(async () => {
    userObject = await userService.create(fakeUserObject);
    user = userObject.user;
  });

  it("Should request for password.", async () => {
    const req = {
      body: {
        email: user.email,
      },
    };

    const res = Object.create({});
    res.status = function (status) {
      return this;
    };
    req.flash = sinon.spy();
    res.redirect = sinon.spy();
    await passwordController.reset(req, res);
    expect(res.redirect.calledOnce).to.be.true;
    expect(req.flash.calledOnce).to.be.true;
  });
});
