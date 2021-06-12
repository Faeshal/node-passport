const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");
const log = require("log4js").getLogger("auth");
log.level = "info";

passport.use(
  new LocalStrategy(function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  log.info("user:", user);
  done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  User.findById(userId, function (err, user) {
    done(err, user);
    log.info(user);
  });
});
