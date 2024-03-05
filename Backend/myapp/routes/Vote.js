const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Vote = require('../models/VoteData');

// Route สำหรับอัปเดตคะแนนโหวต
router.post('/update-vote', async (req, res) => {
  try {
    const { address_web3, code_id } = req.body;

    // ค้นหาผู้ใช้ด้วย address_web3 และ code_id ในฐานข้อมูล
    const user = await User.findOne({ address_web3, code_id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.vote += 1;// อัปเดตคะแนนโหวต
    await user.save();// บันทึกข้อมูลผู้ใช้ที่ถูกอัปเดตลงในฐานข้อมูล

    res.status(200).json({ message: 'Vote updated successfully', newVoteCount: user.vote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update vote' });
  }
});

/// เพิ่ม Route สำหรับรับข้อมูลโหวตผ่าน POST request
router.post('/votesData', async (req, res) => {
  try {
    // สร้าง Vote ใหม่จากข้อมูลที่รับเข้ามา
    const newVote = new Vote(req.body);
    await newVote.save();
    res.status(201).send(newVote);
  } catch (err) {
    res.status(400).send(err);
  }
});




module.exports = router;
