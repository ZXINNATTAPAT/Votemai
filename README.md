# Decentralized Voting Application

นี่คือแอปพลิเคชันสาธิตการใช้งานการลงคะแนนใน smart contract ที่แข็งแกร่งโดยใช้ ReactJS + Bootstrap

## Features
- Decentralized voting system powered by smart contracts on the MATIC blockchain.
- User-friendly web interface built with React.js and Bootstrap.
- Secure authentication and authorization using JWT tokens.
- Data storage using MongoDB Atlas cloud database.
- IPFS integration for decentralized storage of vote data.

<!-- [Youtube Tutorial](https://youtu.be/eCn6mHTpuM0) -->

## Installation Frontend + set smart Contract

หลังจากที่คุณโคลนพื้นที่เก็บข้อมูลแล้ว คุณต้องการติดตั้งแพ็คเกจโดยใช้

```shell
npm install
```

ก่อนอื่นคุณต้องรวบรวมสัญญาและอัปโหลดไปยังเครือข่ายบล็อคเชน รันคำสั่งต่อไปนี้เพื่อคอมไพล์และอัพโหลดสัญญา

```shell
npx hardhat compile
npx hardhat run --network MATIC scripts/deploy2.js
```
เมื่ออัพโหลดสัญญาไปยังบล็อคเชนแล้ว ให้คัดลอกที่อยู่สัญญาและคัดลอกในไฟล์ .env คุณยังสามารถใช้ blockchain อื่นได้โดยการเขียนจุดสิ้นสุดของ blockchain ใน hardhat-config

เมื่อคุณวางคีย์ส่วนตัวและที่อยู่สัญญาในไฟล์ .env แล้ว ให้เรียกใช้คำสั่ง

```shell
npm start
```

## Installation Backend 

แยกคนละ Terminal นะ 
อยู่ในโพลเดอร์ Backend ใช้ Node.js + Express 

```shell
cd Backend 
cd my-app
npm install
```
ถ้าต้องการรัน Backend
```shell
nodemon index.js
```

## Mongodb

สร้างไฟล์ .env ไว้เก็บ ใช้แบบ Compass นะครับ

```shell
MONGODB_URI ='mongodb+srv://<name>:<password>@cluster0.blsdxre.mongodb.net/Votemai'
JWT_SECRET= "เชตเป็นอะไรก็ได้"
```
## Resources

- [MongoDB](https://www.mongodb.com/) - NoSQL database for storing user data.
- [Express.js](https://expressjs.com/) - Web application framework for Node.js.
- [React.js](https://reactjs.org/) - JavaScript library for building user interfaces.
- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [IPFS(pinata)](https://www.pinata.cloud/) - InterPlanetary File System for decentralized storage.
- [MATIC Network](https://matic.network/) - Scalable and instant blockchain platform.
- [Metamask](https://metamask.io/) - Crypto wallet and gateway to blockchain apps.
- [Hardhat](https://hardhat.org/) - Ethereum development environment for professionals.
- [Axios](https://axios-http.com/) - Promise-based HTTP client for making requests.
- [Bootstrap](https://getbootstrap.com/) - Frontend framework for building responsive designs.
- [JWT](https://jwt.io/) - JSON Web Tokens for secure authentication.
- [dotenv](https://www.npmjs.com/package/dotenv) - Module for loading environment variables.
- [Nodemon](https://nodemon.io/) - Utility for automatically restarting the server.

## How to 

- [MATIC Network](https://medium.com/stakingbits/how-to-connect-polygon-mumbai-testnet-to-metamask-fc3487a3871f) - How to connect Polygon Mumbai Testnet to MetaMask 


