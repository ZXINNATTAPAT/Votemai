/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

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