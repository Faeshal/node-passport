require("pretty-error").start();
const log = require("log4js").getLogger("auth");
log.level = "info";

exports.protect = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
  } catch (err) {
    log.error(err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
