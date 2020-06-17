const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/api/v1/users");
const passwordController = require("../../../controllers/api/v1/password");
const authenticate = require("../../../middleware/authenticate");

router.post("/login", authenticate);
router.post("/users", usersController.create);
router.post("/password", passwordController.update);

module.exports = router;
