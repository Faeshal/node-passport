require("pretty-error").start();
const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const log = require("log4js").getLogger("auth");
log.level = "info";

// * @route   POST /api/auth/register
// @desc      Signup new user
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // * Check Double Email
  const isExist = await User.findOne({ email: email });
  if (isExist) {
    return res
      .status(400)
      .json({ success: false, message: "Email Already Exist" });
  }

  // * Hash Password
  const hashedPw = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    email,
    password: hashedPw,
  });
  await user.save();

  res.status(200).json({
    success: true,
    data: { name, email },
  });
});

// * @route   POST /api/auth/login
// @desc      Signin new user
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // * Check is email exist ?
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User / Password Doesn't Match or Exist",
    });
  }

  // * Compare Password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "User / Password Doesn't Match or Exist",
    });
  }

  // * Send Back Data Without Sensitive Information
  const data = await User.findOne({ email: email });

  res.status(200).json({ success: true, data });
});

// * @route   POST /api/auth/logout
// @desc      Logout User
// @access    Private
// exports.logout = asyncHandler(async (req, res, next) => {
//   if (!req.session.user) {
//     return res.status(400).json({
//       success: false,
//       message: "You Dont Have Any Session, Please Login to the system",
//     });
//   }
//   // * Generate New apiKey
//   const newApiKey = uniqid() + uniqid.process();
//   await User.findOneAndUpdate({ _id: req.session.user }, { apiKey: newApiKey });

//   // * Destroy Session from DB
//   req.session.destroy((err) => {
//     if (err) {
//       log.error(err);
//     }
//   });
//   res.status(200).json({ success: true, message: "Successfully Logout" });
// });

// * @route GET /api/auth/accounts
// @desc    Get User Detail
// @access  Private
exports.getAccountInfo = asyncHandler(async (req, res, next) => {
  const data = await User.findById(req.session.user);
  return res.status(200).json({ success: true, data });
});
