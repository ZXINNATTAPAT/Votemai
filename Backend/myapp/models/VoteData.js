// models/Vote.js

const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  name_vote: {
    type: String,
    required: true
  },
  votes: {
    type: Map,
    of: Number,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  IpfsHash: {
    type: String, // สมมติว่าเก็บเป็น String
    required: false // ถ้าไม่จำเป็นต้องมีข้อมูลตลอดเวลา
  }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
