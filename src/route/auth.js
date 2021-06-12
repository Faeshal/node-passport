const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const passport = require("passport");
const { protect } = require("../middleware/auth");

router.post("/api/auth/register", authController.register);

router.post(
  "/api/auth/login",
  passport.authenticate("local", { failureRedirect: "/failedlogin" }),
  authController.login
);

router.get("/api/auth/accounts", protect, authController.getAccountInfo);

module.exports = router;
