const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  name: String,
  register: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
