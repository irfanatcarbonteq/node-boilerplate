const Jwt = require("jsonwebtoken");
const appError = require("../../../HTTP/errors/appError");
const { application } = require("../config");
const UserFactory = require("../../Infrastructure/factories/UserFactory");
const store = UserFactory.buildUserStore();

class AuthService {
  constructor() {}

  userHasAuthorization(req) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
      throw new appError("Access denied. No token provided.", 400);
    }

    try {
      const decoded = Jwt.verify(token, application.myPrivateKey);
      return store.userIsPresent(decoded.userID);
    } catch (ex) {
      throw new appError(ex, 400);
    }
  }

  generateJwtToken(userID) {
    return Jwt.sign({ userID: userID }, application.myPrivateKey);
  }
}
module.exports = AuthService;
