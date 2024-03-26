const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');

router.post('/store-contract-address', async (req, res) => {
    try {
      const { contractAddress } = req.body;
  
      // Store the contract address in MongoDB
      const contract = new Contract({ address: contractAddress });
      await contract.save();
  
      // Return a success message to the client
      res.status(200).json({ message: 'Contract address stored successfully' });
    } catch (error) {
      console.error('Error storing contract address:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;