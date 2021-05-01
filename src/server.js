const express = require("express");
const app = express();
const PORT = 3000;
const log4js = require("log4js");
const log = log4js.getlog();
logger.level = "debug";

// * Routing
app.get("/", (req, res) => {
  res.status(200).json({ success: false, message: "Welcome to Express" });
});

// * Database

// * App Listen
app.listen(PORT, (err) => {
  if (err) {
    log.error(er);
  }
  log.info("Server is running on port:" + PORT);
});
