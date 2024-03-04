const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route สำหรับอัปเดตคะแนนโหวต
router.post('/update-vote', async (req, res) => {
  try {
    const { address_web3, code_id } = req.body;

    // ค้นหาผู้ใช้ด้วย address_web3 และ code_id ในฐานข้อมูล
    const user = await User.findOne({ address_web3, code_id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // อัปเดตคะแนนโหวต
    user.vote += 1;

    // บันทึกข้อมูลผู้ใช้ที่ถูกอัปเดตลงในฐานข้อมูล
    await user.save();

    res.status(200).json({ message: 'Vote updated successfully', newVoteCount: user.vote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update vote' });
  }
});

module.exports = router;
