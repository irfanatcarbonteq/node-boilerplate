const handleError = require("../utils/handleError");
const JwtAuthService = require("../../App/Infrastructure/services/JwtAuthService");
const jwtAuthService = new JwtAuthService();

module.exports = async function (req, res) {
  try {
    const { email, password } = req.body;
    res
      .status(200)
      .json(
        await jwtAuthService.validateUserCredentials({
          email: email,
          password: password,
        })
      );
  } catch (e) {
    handleError(e, res);
  }
};
