// models/User.js
const mongoose = require('mongoose');
// const CryptoJS = require("crypto-js");

// old Model
// const UserSchema = new mongoose.Schema({
//   code_id: String,
//   p_name: String,
//   s_name: String,
//   address_web3: String,
//   roles: String,
//   vote: Number,
// });

// สร้าง Schema สำหรับ User
const UserSchema = new mongoose.Schema({
  SHA256_code: String,
  code_id: String,
  p_name: String,
  s_name: String,
  address_web3: String,
  roles: String,
  vote: Number,
  secret_key: String
});


const User = mongoose.model('User', UserSchema);

module.exports = User;



