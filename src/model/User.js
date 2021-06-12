const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  name: String,
  apikey: {
    type: String,
    select: false,
  },
  register: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
