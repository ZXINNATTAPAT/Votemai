const mongoose = require('mongoose');
// Define a schema for storing contract addresses
const contractSchema = new mongoose.Schema({
    address: String,
  });
  
  // Create a model for the contract schema
const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;