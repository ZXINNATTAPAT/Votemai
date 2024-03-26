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
      gas: 3000000, // Increase the gas limit to a higher value
      gasPrice: 8000000000,
     },
   },
   solidity: {
      compilers: [
        {
          version: "0.8.0",
          settings: {}  // สามารถเพิ่มเวอร์ชัน Solidity อื่น ๆ ที่ต้องการใช้ได้ตามต้องการ
        },
      ]
    },
    paths: {
      artifacts: "./Backend/myapp/artifacts"
    },
   
 };