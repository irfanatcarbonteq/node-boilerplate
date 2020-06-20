require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const flash = require("express-flash-messages");
const { applicationSecretKey } = require("../../App/Infrastructure/config");
require("../../App/Infrastructure/models/dataBaseConnection");
const apiRoutes = require("../routes/api/v1/apiRoutes");
const applicationRoutes = require("../routes/applicationRoutes");
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const store = require("../session")(session);
app.use(
  session({
    secret: applicationSecretKey,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use("/api/v1/", apiRoutes);
app.use(applicationRoutes);
module.exports = app;
