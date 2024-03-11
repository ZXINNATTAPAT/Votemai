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
  }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
