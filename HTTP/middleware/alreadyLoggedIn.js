module.exports = async function (req, res, next) {
  if (req.session.userID === undefined) {
    next();
  } else {
    req.flash("info", "You are already logged in.");
    res.redirect("/dashboard");
  }
};
