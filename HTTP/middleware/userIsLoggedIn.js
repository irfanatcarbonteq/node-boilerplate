const JwtAuthService = require("../../App/Infrastructure/services/JwtAuthService");
const jwtAuthService = new JwtAuthService();

module.exports = async function (req, res, next) {
  try {
    const userIsLoggedIn = await jwtAuthService.userIsLoggedIn(req);
    if (userIsLoggedIn) {
      next();
    }
  } catch (e) {
    req.flash("error", "You need to sign in first");
    res.redirect("/login");
  }
};
