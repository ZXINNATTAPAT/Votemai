const express = require('express');
const mongoose = require('mongoose');
const User = require('./routes/User');
const Auth = require('./routes/Auth');
const cors = require('cors'); // เพิ่ม cors middleware

const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!')
  })
//   mongodb+srv://bigboyzin88:<password>@cluster0.blsdxre.mongodb.net/
// ตั้งค่าการเชื่อมต่อ MongoDB
mongoose.connect('mongodb+srv://bigboyzin88:fT1RfFwuBV5If7Gp@cluster0.blsdxre.mongodb.net/Votemai', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

app.use(cors());
app.use(express.json()); // เพื่อให้ Express อ่าน JSON ใน request body

// เชื่อมต่อเส้นทางในไฟล์ routes
app.use(User);
app.use(Auth);

// กำหนดพอร์ตที่ Express.js จะเริ่มต้นฟัง
const PORT =  8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
