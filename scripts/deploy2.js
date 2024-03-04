require('dotenv').config();
const { MongoClient } = require('mongodb');
const { ethers } = require('ethers');

async function main() {
  // Connect to MongoDB
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB");

  // Get the database and collection
  const database = client.db(Votemai);
  const collection = database.collection(users);

  // Query MongoDB to get the users' data except for "admin" and "user" roles
  const queryResult = await collection.find({ roles: { $nin: ["admin", "user"] } }).toArray();
  
  // Format the names of users
  const userNames = queryResult.map(userData => `${userData.p_name} ${userData.s_name}`);

  // Close the connection to MongoDB
  await client.close();
  console.log("Disconnected from MongoDB");

  // Deploy the contract with the users' names retrieved from MongoDB
  const Voting = await ethers.getContractFactory("Voting");
  const Voting_ = await Voting.deploy(userNames, 90);
  console.log("Contract address:", Voting_.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
