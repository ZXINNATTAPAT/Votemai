const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/auth', async (req, res) => {
    try {
      const { address_web3 } = req.body;
  
      // ค้นหา user จาก address_web3 ที่ตรงกับ Metamask address
      const user = await User.findOne({ address_web3: address_web3 });
  
      // ถ้าไม่พบ user ที่ตรงกับ address_web3
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // พบ user ที่ตรงกับ address_web3
      // ส่งข้อมูล user ไปยังฝั่ง client
      res.status(200).json({ message: 'User authenticated successfully', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to authenticate user' });
    }
  });
  
module.exports = router;
