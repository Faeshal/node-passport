const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.post("/api/auth/register", authController.register);

router.post("/api/auth/login", authController.login);

router.get("/api/auth/accounts", authController.getAccountInfo);

module.exports = router;
