const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { protect } = require("../middleware/auth");

router.get("/api/users", protect, userController.getUsers);

module.exports = router;
