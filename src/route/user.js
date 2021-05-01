const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
// const { protect, authorize } = require("../middleware/auth");

router.get("/api/users", userController.getUsers);

module.exports = router;
