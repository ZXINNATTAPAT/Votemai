require('dotenv').config();
const axios = require('axios');
// const { ethers } = require('ethers');

async function main() {
    // Deploy the contract with the users' names retrieved from the API
    const Voting = await ethers.getContractFactory("Voting");

    // Fetch user data from the local API (assuming it's running on port 5000)
    const response = await axios.get('http://localhost:8000/users');
    const userData = response.data;

    // Format the names of users
    const userNames = userData.map(user => `${user.p_name} ${user.s_name}`);

    
    const Voting_ = await Voting.deploy(userNames, 90);
    console.log("Contract address:", Voting_.address);
 
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
