const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/api/v1/users");
const authenticate = require("../../../middleware/authenticate");

router.post("/login", authenticate);
router.post("/users", usersController.create);

module.exports = router;
