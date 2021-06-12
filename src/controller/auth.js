require("pretty-error").start();
const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const log = require("log4js").getLogger("auth");
log.level = "info";
const passport = require("passport");

// * @route   POST /api/auth/register
// @desc      Signup new user
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, username, password } = req.body;

  // * Check Double Username
  const isExist = await User.findOne({ username: username });
  if (isExist) {
    return res
      .status(400)
      .json({ success: false, message: "username Already Exist" });
  }

  // * Hash Password
  const hashedPw = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    username,
    password: hashedPw,
  });
  await user.save();

  res.status(200).json({
    success: true,
    data: { name, username },
  });
});

// * @route   POST /api/auth/login
// @desc      Signin new user
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  log.info("Masuk login");

  // * Send Back Data Without Sensitive Information
  const data = await User.findOne({ username: username });

  log.info("session:", req.session);

  res.status(200).json({ success: true, data });
});

// * @route   POST /api/auth/logout
// @desc      Logout User
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    return res.status(400).json({
      success: false,
      message: "You Dont Have Any Session, Please Login to the system",
    });
  }
  // * Generate New apiKey
  const newApiKey = uniqid() + uniqid.process();
  await User.findOneAndUpdate({ _id: req.session.user }, { apiKey: newApiKey });

  // * Destroy Session from DB
  req.session.destroy((err) => {
    if (err) {
      log.error(err);
    }
  });
  res.status(200).json({ success: true, message: "Successfully Logout" });
});

// * @route GET /api/auth/accounts
// @desc    Get User Detail
// @access  Private
exports.getAccountInfo = asyncHandler(async (req, res, next) => {
  const data = await User.findById(req.session.passport.user._id);
  console.log("SESSIONNYA NIH BOS:", req.session);
  return res.status(200).json({ success: true, data });
});
