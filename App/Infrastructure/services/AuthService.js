const Jwt = require("jsonwebtoken");
const appError = require("../../../HTTP/errors/appError");
const { applicationSecretKey } = require("../config");
const UserFactory = require("../../Infrastructure/factories/UserFactory");
const store = UserFactory.buildUserStore();

class AuthService {
  constructor() {}

  userIsLoggedIn(req) {
    try {
      const token =
        req.headers["x-access-token"] ||
        req.headers["authorization"] ||
        req.session.token;
      const decoded = Jwt.verify(token, applicationSecretKey);
      return store.userIsPresent(decoded.userID);
    } catch (ex) {
      throw new appError(ex, 400);
    }
  }

  generateJwtToken(userID) {
    return Jwt.sign({ userID: userID }, applicationSecretKey);
  }
}
module.exports = AuthService;
