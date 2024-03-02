// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  code_id: String,
  p_name: String,
  s_name: String,
  address_web3: String,
  roles: String,
  vote: Number
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
