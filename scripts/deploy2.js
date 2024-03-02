const { MongoClient } = require('mongodb');
const { ethers } = require('ethers');

//ของใหม่
async function main() {
  // Connect to MongoDB
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB");

  // Get the database and collection
  const database = client.db("your-database-name");
  const collection = database.collection("your-collection-name");

  // Query MongoDB to get the names
  const queryResult = await collection.find().toArray();
  const names = queryResult.map(item => item.name);

  // Close the connection to MongoDB
  await client.close();
  console.log("Disconnected from MongoDB");

  // Deploy the contract with the names retrieved from MongoDB
  const Voting = await ethers.getContractFactory("Voting");
  const Voting_ = await Voting.deploy(names, 90);
  console.log("Contract address:", Voting_.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });