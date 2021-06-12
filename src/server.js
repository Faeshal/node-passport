const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const log4js = require("log4js");
const morgan = require("morgan");
const passport = require("passport");
const log = log4js.getLogger("entrypoint");
log.level = "info";
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/User");
const authRoute = require("./route/auth");
const userRoute = require("./route/user");

// * Basick pkg
app.use(express.json());
app.use(morgan("dev"));

// * Session
app.use(
  session({
    secret: "tdVEZXp7DD",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      log.info("user:", user);
      return done(null, user);
    });
  })
);

// * Routing
app.use(authRoute);
app.use(userRoute);

app.get("/", (req, res) => {
  res.status(200).json({ success: false, message: "Welcome to Express" });
});

app.get("*", (req, res) => {
  res.status(404).json({ success: false, message: "Nothing In this Route..." });
});

// * Database Connection
mongoose.connect("mongodb://localhost:27017/passport", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  log.info("MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  log.info("MongoDB connection error: " + err);
});

// * App Listen
app.listen(PORT, (err) => {
  if (err) {
    log.error(er);
  }
  log.info("Server is running on port:" + PORT);
});
