const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

// router.post(
//   "/api/auth/register",
//   [
//     body("name", "Name is Required").not().isEmpty().trim(),
//     body("email", "Wrong Email Format").isEmail(),
//     body("password", "Password lenghth minimum is 5")
//       .trim()
//       .isLength({ min: 5 }),
//   ],
//   authController.register
// );

// router.post(
//   "/api/auth/login",
//   [
//     body("email", "Please Enter a Valid Email").isEmail(),
//     body("password", "Password Is Required").not().isEmpty().trim(),
//   ],
//   authController.login
// );

router.get("/api/auth/accounts", authController.getAccountInfo);

module.exports = router;
