const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/addusers', async (req, res) => {
  try {
    const { code_id, p_name, s_name, address_web3, roles, vote } = req.body;

    // สร้าง instance ของ User ใหม่
    const newUser = new User({ code_id, p_name, s_name, address_web3, roles, vote });

    // บันทึกข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
    await newUser.save();

    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add user' });
  }
});

router.post('/addusers', async (req, res) => {
  try {
    const { code_id, p_name, s_name, address_web3, roles, vote } = req.body;

    // สร้าง instance ของ User ใหม่
    const newUser = new User({ code_id, p_name, s_name, address_web3, roles, vote });

    // บันทึกข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
    await newUser.save();

    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add user' });
  }
});


// เส้นทาง GET เพื่อดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to retrieve users' });
    }
  });

module.exports = router;
