const express = require('express'); const mongoose = require('mongoose'); 
const User = require('./routes/User'); const Auth = require('./routes/Auth'); 
const vote = require('./routes/Vote'); const cors = require('cors');
const app = express(); // เพิ่ม cors middlewarerequire('dotenv').config(); // ให้โหลดค่าจาก .env file
app.get('/', function (req, res) { res.send('Hello World!') })
// ตั้งค่าการเชื่อมต่อ MongoDB mongodb+srv://bigboyzin88:<password>@cluster0.blsdxre.mongodb.net/
mongoose.connect(process.env.MONGODB_URI, {}).then(() => { console.log('Connected to MongoDB'); })
  .catch((err) => { console.error('Error connecting to MongoDB', err); });
app.use(cors()); app.use(express.json()); // เพื่อให้ Express อ่าน JSON ใน request body

// เชื่อมต่อเส้นทางในไฟล์ routes
app.use(User);app.use(Auth);app.use(vote);

// กำหนดพอร์ตที่ Express.js จะเริ่มต้นฟัง
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
