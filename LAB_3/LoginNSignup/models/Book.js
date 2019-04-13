var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', UserSchema);
