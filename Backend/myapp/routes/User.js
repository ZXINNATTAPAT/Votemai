const express = require('express');
const router = express.Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");

function generateRandomKey(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?';
  let randomKey = '';
  for (let i = 0; i < length; i++) {
    randomKey += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomKey;
}

// router.post('/addusers', async (req, res) => {
//   try {
//     const { code_id, p_name, s_name, address_web3, roles, vote } = req.body;

//     // สร้าง instance ของ User ใหม่
//     const newUser = new User({ code_id, p_name, s_name, address_web3, roles, vote });

//     // บันทึกข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
//     await newUser.save();

//     res.status(201).json({ message: 'User added successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to add user' });
//   }
// });

// router.post('/addusers', async (req, res) => {
//   try {
//     const { code_id, p_name, s_name, address_web3, roles, vote } = req.body;

//     // ตรวจสอบว่า code_id หรือ address_web3 ซ้ำหรือไม่
//     const existingUser = await User.findOne({ $or: [{ code_id }, { address_web3 }] });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User with the same code_id or address_web3 already exists' });
//     }

//     // สร้าง instance ของ User ใหม่
//     const newUser = new User({ code_id, p_name, s_name, address_web3, roles, vote });

//     // บันทึกข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
//     await newUser.save();

//     res.status(201).json({ message: 'User added successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to add user' });
//   }
// });

// Endpoint API สำหรับเพิ่มผู้ใช้ใหม่
router.post('/addusers', async (req, res) => {
  try {
    const { code_id, p_name, s_name, address_web3, roles, vote } = req.body;

      /// สร้าง secret_key แบบสุ่ม
      const secret_key = generateRandomKey(Math.floor(Math.random() * (8 - 7 + 1)) + 7);

      // สร้าง SHA256 code จาก code_id
      const encryptedCodeId = CryptoJS.AES.encrypt(JSON.stringify(code_id), secret_key).toString();
      // const sha256Code = CryptoJS.SHA256(encryptedCodeId).toString(CryptoJS.enc.Hex);

      // ถอดรหัส code_id ด้วย secret_key
      const decryptedCodeIdBytes = CryptoJS.AES.decrypt(encryptedCodeId, secret_key);
      const decryptedCodeId = decryptedCodeIdBytes.toString(CryptoJS.enc.Utf8);

      console.log('Decrypted code_id:', decryptedCodeId);

    // ตรวจสอบว่า code_id หรือ address_web3 ซ้ำหรือไม่
    const existingUser = await User.findOne({ $or: [{ code_id }, { address_web3 }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with the same code_id or address_web3 already exists' });
    }

    // สร้าง instance ของ User ใหม่
    const newUser = new User({ code_id, p_name, s_name, address_web3, roles, vote, secret_key, encryptedCode: encryptedCodeId });

    // บันทึกข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
    await newUser.save();

    res.status(201).json({ message: 'User added successfully', secret_key: secret_key , decryptedCodeId : decryptedCodeId  });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add user' });
  }
});

router.post('/decrypted/users', async (req, res) => {
  try {
      const encryptedCodeId = req.body.encryptedCode;
      const secret_key = req.body.secret_key;
      
      console.log('Encrypted code id:', encryptedCodeId);
      console.log('Secret key:', secret_key);

      // ถอดรหัสข้อมูลโดยใช้คีย์ลับ
      const decryptedCodeIdBytes = CryptoJS.AES.decrypt(encryptedCodeId, secret_key);
      let decryptedCodeId = decryptedCodeIdBytes.toString(CryptoJS.enc.Utf8);
      
      // ลบเครื่องหมาย " และช่องว่างที่เกิดขึ้น
      decryptedCodeId = decryptedCodeId.replace(/"/g, '').trim();
      
      console.log('Decrypted code id:', decryptedCodeId);

      // ค้นหาข้อมูลผู้ใช้โดยใช้ decryptedCodeId ที่ถอดรหัสได้
      const userData = await User.findOne({ code_id: decryptedCodeId });

      console.log('User data:', userData);
      res.json(userData); // ส่งข้อมูลผู้ใช้กลับไป
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
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
