# Decentralized Voting Application

นี่คือแอปพลิเคชันสาธิตการใช้งานการลงคะแนนใน smart contract ที่แข็งแกร่งโดยใช้ ReactJS + Bootstrap

<!-- [Youtube Tutorial](https://youtu.be/eCn6mHTpuM0) -->

## Installation Frontend + set smart Contract

หลังจากที่คุณโคลนพื้นที่เก็บข้อมูลแล้ว คุณต้องการติดตั้งแพ็คเกจโดยใช้

```shell
npm install
```

ก่อนอื่นคุณต้องรวบรวมสัญญาและอัปโหลดไปยังเครือข่ายบล็อคเชน รันคำสั่งต่อไปนี้เพื่อคอมไพล์และอัพโหลดสัญญา

```shell
npx hardhat compile
npx hardhat run --network volta scripts/deploy.js
```
เมื่ออัพโหลดสัญญาไปยังบล็อคเชนแล้ว ให้คัดลอกที่อยู่สัญญาและคัดลอกในไฟล์ .env คุณยังสามารถใช้ blockchain อื่นได้โดยการเขียนจุดสิ้นสุดของ blockchain ใน hardhat-config

เมื่อคุณวางคีย์ส่วนตัวและที่อยู่สัญญาในไฟล์ .env แล้ว ให้เรียกใช้คำสั่ง

hardhat.config.js ใช้ MATIC 

```shell
module.exports = {
   defaultNetwork: "MATIC",
   networks: {
     hardhat: {},
     MATIC: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      gas: 210000000,
      gasPrice: 800000000000,
     },
   },
   solidity: {
      compilers: [
        {
          version: "0.8.0",
          settings: {} 
          // สามารถกำหนดการตั้งค่าเพิ่มเติมได้ตามต้องการ
        },
        // สามารถเพิ่มเวอร์ชัน Solidity อื่น ๆ ที่ต้องการใช้ได้ตามต้องการ
      ]
    }
   
 };
```

```shell
npm start
```

## Installation Backend 

แยกคนละ Terminal นะ 
อยู่ในโพลเดอร์ Backend ใช้ Node.js + Express 

```shell
cd React-Voting-Application 
cd Backend 
cd my-app
npm install
```

ถ้าต้องการรัน Backend

```shell
nodemon index.js
```

## Mongodb

สร้างไฟล์ .env ไว้เก็บ 

ใช้แบบ Compass นะ

```shell
MONGODB_URI ='mongodb+srv://<name>:<password>@cluster0.blsdxre.mongodb.net/Votemai'
JWT_SECRET= "เชตเป็นอะไรก็ได้"
```




