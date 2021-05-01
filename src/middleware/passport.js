const HeaderAPIKeyStrategy = require("passport-headerapikey")
  .HeaderAPIKeyStrategy;
const User = require("../model/User");

module.exports = function (passport) {
  passport.use(
    new HeaderAPIKeyStrategy(
      { header: "Authorization", prefix: "Api-Key " },
      false,
      (apikey, done) => {
        User.findOne({ apikey: apikey }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
