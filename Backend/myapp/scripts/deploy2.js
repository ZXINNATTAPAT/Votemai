const axios = require('axios');

async function main() {

  const Voting = await ethers.getContractFactory("Voting");
 
  const response = await axios.get('http://localhost:8000/users');
  const userData = response.data;
  
  // Filter out users who are candidates
  const candidateUsers = userData.filter(user => user.roles.includes("candidate"));

  // Format the names of candidate users
  const candidateNames = candidateUsers.map(user => `${user.p_name} ${user.s_name}`);

  // เรียกใช้งาน deploy โดยไม่ระบุที่อยู่ผู้ส่ง
  const Voting_ = await Voting.deploy(candidateNames, 30);

  console.log("Contract address:", Voting_.address);
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
