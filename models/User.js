const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

module.exports = mongoose.model("Users", UserSchema);
