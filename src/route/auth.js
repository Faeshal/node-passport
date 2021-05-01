const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const passport = require("passport");

router.post("/api/auth/register", authController.register);

router.post(
  "/api/auth/login",
  passport.authenticate("HeaderAPIKeyStrategy"),
  authController.login
);

router.get("/api/auth/accounts", authController.getAccountInfo);

module.exports = router;
