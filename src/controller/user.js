require("pretty-error").start();
const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const log = require("log4js").getLogger("user");
log.level = "info";

// * @route   GET /api/users
// @desc      Get all Users
// @access    Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.find().sort({ _id: -1 }).lean();

    res.status(200).json({
      success: true,
      totalData: user.length,
      data: user,
    });
  } catch (err) {
    log.error(err);
    next(err);
  }
});
