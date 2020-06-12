const express = require("express");
const applicationRouter = express.Router();
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const bodyParser = require("body-parser");
const parseForm = bodyParser.urlencoded({ extended: false });
const usersController = require("../controllers/users");
const passwordController = require("../controllers/password");
const authenticateWebUser = require("../middleware/authenticateWebUser");
const userIsLoggedIn = require("../middleware/userIsLoggedIn");
const alreadyLoggedIn = require("../middleware/alreadyLoggedIn");

applicationRouter.use("*", (req, res, next) => {
  res.locals.isLoggedIn = req.session.userID !== undefined;
  next();
});

applicationRouter.get("/", (req, res) => {
  res.render("home");
});

applicationRouter.get("/dashboard", userIsLoggedIn, (req, res) => {
  res.render("dashboard");
});

applicationRouter.get("/login", alreadyLoggedIn, csrfProtection, (req, res) => {
  res.render("login", { csrfToken: req.csrfToken() });
});

applicationRouter.post(
  "/login",
  parseForm,
  csrfProtection,
  authenticateWebUser
);

applicationRouter.get(
  "/signup",
  alreadyLoggedIn,
  csrfProtection,
  (req, res) => {
    res.render("signup", { csrfToken: req.csrfToken() });
  }
);

applicationRouter.post(
  "/signup",
  parseForm,
  csrfProtection,
  usersController.create
);

applicationRouter.get(
  "/resetpassword",
  alreadyLoggedIn,
  csrfProtection,
  (req, res) => {
    res.render("password", { csrfToken: req.csrfToken() });
  }
);

applicationRouter.post(
  "/resetpassword",
  parseForm,
  csrfProtection,
  passwordController.reset
);

applicationRouter.get("/updatepassword", (req, res) => {
  res.render("updatepassword", { token: req.query.token });
});

applicationRouter.post("/updatepassword", passwordController.update);

//I tried by following link but its not working for delete so for time being using get.
applicationRouter.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = applicationRouter;
