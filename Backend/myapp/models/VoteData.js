const mongoose = require('mongoose');

// กำหนดโครงสร้างข้อมูลการโหวต
const voteSchema = new mongoose.Schema({
  name_vote: String,  // ชื่อของการโหวต
  votes: Object,      // ข้อมูลการโหวตเช่น { "code_id": 3, "another_candidate_code_id": 5 }
  endDate: Date       // วันที่สิ้นสุดของข้อมูลการโหวต
});

// สร้างโมเดล Vote
const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
