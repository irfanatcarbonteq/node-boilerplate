const JwtAuthService = require("../../App/Infrastructure/services/JwtAuthService");
const jwtAuthService = new JwtAuthService();

module.exports = async function (req, res) {
  try {
    const { email, password } = req.body;
    const authResponse = await jwtAuthService.validateUserCredentials({
      email: email,
      password: password,
    });
    req.session.token = authResponse.token;
    req.session.userID = authResponse.userID;
    req.flash("info", "Logged In Successfully.");
    res.redirect("/dashboard");
  } catch (e) {
    const { email } = req.body;
    req.flash("error", e.message);
    res.render("login", {
      csrfToken: req.csrfToken(),
      error: e.message,
      email: email,
    });
  }
};
