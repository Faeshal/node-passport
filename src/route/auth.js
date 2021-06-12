const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const passport = require("passport");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("TERAUTENTIKASI");
    return next();
  } else {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
}

router.post("/api/auth/register", authController.register);

router.post(
  "/api/auth/login",
  passport.authenticate("local"),
  authController.login
);

router.get("/api/auth/accounts", isLoggedIn, authController.getAccountInfo);

module.exports = router;
