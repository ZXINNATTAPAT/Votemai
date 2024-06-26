const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Vote = require('../models/VoteData');
const axios = require('axios');
require('dotenv').config(); // ให้โหลดค่าจาก .env file

router.use(express.json()); // เพื่อให้ Express อ่าน JSON ใน request body

const rateLimit = require("express-rate-limit");

// เรียกใช้ middleware express-rate-limit และกำหนดจำนวนครั้งและเวลา
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 10 นาที
  max: 20, // จำนวนครั้งสูงสุดที่อนุญาตภายในระยะเวลา 10 นาที
  message: "Too many requests from this IP, please try again later" // ข้อความแจ้งเตือนเมื่อเกินจำนวนครั้งที่กำหนด
});

// Route สำหรับอัปเดตคะแนนโหวต
router.post('/update-vote', async (req, res) => {
  try {
    const { address_web3, code_id, system_req } = req.body;

    // ค้นหาผู้ใช้ด้วย address_web3 และ code_id ในฐานข้อมูล
    const user = await User.findOne({ address_web3, code_id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // อัปเดตโหวตของผู้ใช้ตามเงื่อนไขของระบบ
    switch (system_req) {
      case "Admin":
        if (user.vote === 0) {
          user.vote += 1;
          await user.save();
        }
        break;
      case "vote_sucess":
        if (user.vote === 1) {
          user.vote += 1;
          await user.save();
        }
        break;
      case "vs":
        if (user.vote === 2) {
          user.vote += 1;
          await user.save();
        }
        break;
      default:
        break;
    }

    res.status(200).json({ message: 'Vote updated successfully', newVoteCount: user.vote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update vote' });
  }
});


// เพิ่ม Route สำหรับรับข้อมูลโหวตผ่าน POST request
// เพิ่มข้อมูลโหวตใหม่
// router.post('/votesData', async (req, res) => {
//   try {
//     // Validate required fields
//     if (!req.body.name_vote || !req.body.votes || !req.body.endDate) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
//     // Create a new Vote object from the request body
//     const newVote = new Vote({
//       name_vote: req.body.name_vote,
//       votes: req.body.votes,
//       endDate: req.body.endDate
//     });

//     // Save the new Vote object to the database
//     await newVote.save();

//     // Send a success response with the newly created Vote object
//     res.status(201).json({ newVote });
//   } catch (err) {
//     // Handle errors
//     console.error('Error saving vote data:', err);
//     res.status(500).json({ message: 'Failed to save vote data', error: err.message });
//   }
// });

// เส้นทางสำหรับแสดงข้อมูลโหวต
router.get('/sh-votesData', async (req, res) => {
  try {
    // ค้นหาข้อมูลโหวตทั้งหมดในฐานข้อมูล
    const votes = await Vote.find({});

    // กรองค่า undefined ออกจากข้อมูล votes
    const filteredVotes = votes.filter(vote => vote.votes !== undefined);

    res.status(200).json({ votes: filteredVotes });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve votes data' });
  }
});

// router.post('/pinFileToIPFS', async (req, res) => {
//   try {
//       const storedVoteSummary = req.body.storedVoteSummary; 

//       // แปลงข้อมูล JSON เป็น string
//       const storedVoteSummaryString = JSON.stringify(storedVoteSummary);

//       const formData = new FormData();

//       // เพิ่มข้อมูล storedVoteSummary เข้าไปใน FormData ในรูปแบบของ JSON string
//       formData.append('storedVoteSummary', storedVoteSummaryString);
//       const JWT = process.env.YOUR_JWT_ENV_VARIABLE; 
//       // Replace 'your_jwt_token_here' with your actual JWT token
    
//       const response = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", formData, {
//           maxBodyLength: Infinity,
//           headers: {
//               'Authorization': `Bearer ${JWT}`,
//               'Content-Type': `application/json`
              
//           }
//       });

//       // ส่งคำตอบกลับไปยัง client
//       res.json(response.data);
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//   }

// });

// router.post('/votesData', async (req, res) => {
//   try {
//     // Validate required fields
//     if (!req.body.name_vote || !req.body.votes || !req.body.endDate) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
//     // Create a new Vote object from the request body
//     const newVote = new Vote({
//       name_vote: req.body.name_vote,
//       votes: req.body.votes,
//       endDate: req.body.endDate
//     });

//     // Save the new Vote object to the database
//     await newVote.save();

//     // Pin the vote data to IPFS
//     const formData = new FormData();
//     formData.append('storedVoteSummary', JSON.stringify(req.body));

//     const JWT = process.env.YOUR_JWT_ENV_VARIABLE;
//     const response = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", formData, {
//         maxBodyLength: Infinity,
//         headers: {
//             'Authorization': `Bearer ${JWT}`,
//             'Content-Type': `application/json`
//         }
//     });
//     console.log(response.data);

//     // Send a success response with the newly created Vote object
//     res.status(201).json({ newVote });
//   } catch (err) {
//     // Handle errors
//     console.error('Error saving vote data:', err);
//     res.status(500).json({ message: 'Failed to save vote data', error: err.message });
//   }
// });

router.put('/votesData-repost', async (req, res) => {
  try {
      // Check if required fields are missing
      if (!req.body.name_vote || !req.body.votes || !req.body.endDate || Object.keys(req.body.votes).length === 0) {
          return res.status(400).json({ message: 'Missing required fields' });
      }

      // Check if the data already exists in the MongoDB
      const existingVote = await Vote.findOne({ _id: req.body._id, IpfsHash: req.body.IpfsHash });

      // If the data doesn't exist or if it exists but differs from the request body, proceed
      if (!existingVote || JSON.stringify(existingVote.votes) !== JSON.stringify(req.body.votes) || existingVote.endDate !== req.body.endDate) {
          // Update existing vote or create a new one
          const updatedVote = {
              name_vote: req.body.name_vote,
              votes: req.body.votes,
              endDate: req.body.endDate,
              IpfsHash: req.body.IpfsHash
          };

          // Perform update or create operation
          const options = { upsert: true, new: true }; // Option to create new document if not found
          const result = await Vote.findOneAndUpdate({ _id: req.body._id, IpfsHash: req.body.IpfsHash }, updatedVote, options);

          return res.status(200).json({ message: 'Vote updated or created successfully', vote: result });
      } else {
          return res.status(200).json({ message: 'Vote already exists and matches the request' });
      }
  } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/votesData', limiter, async (req, res) => {
  try {
    // Validate required fields
    console.log(req.body.votes);
    console.log(req.body);

    if (!req.body.name_vote || !req.body.votes || !req.body.endDate || Object.keys(req.body.votes).length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
      // Check if the data already exists in the MongoDB
      const existingVote = await Vote.findOne({ name_vote: req.body.name_vote });
      console.log(existingVote);
      // If the data doesn't exist or if it exists but differs from the request body, proceed
      if (!existingVote) {
        // Create a new Vote object from the request body
        const newVote = new Vote({
            name_vote: req.body.name_vote,
            votes: req.body.votes,
            endDate: req.body.endDate,
            IpfsHash: null
        });
        // Save the new vote
        await newVote.save();
        // Check if there is an existing vote with null IpfsHash for the same month
        const existingVoteIfps = await Vote.findOne({ name_vote:req.body.name_vote ,IpfsHash: null , endDate: req.body.endDate });
        // Pin the vote data to IPFS if there's an existing vote with null IpfsHash
        if (existingVoteIfps) {
            const formData = new FormData();
            formData.append('voteData', JSON.stringify(req.body));
    
            const JWT = process.env.YOUR_JWT_ENV_VARIABLE;
            const response = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", formData, {
                maxBodyLength: Infinity,
                headers: {
                    'Authorization': `Bearer ${JWT}`,
                    'Content-Type': `application/json`
                }
            });
            console.log(response.data);
    
            // Update the newVote object with the IPFS hash
            newVote.IpfsHash = response.data.IpfsHash;
    
            // Save the newVote object with the updated IPFS hash to the database
            await newVote.save();
        }
    } else {
        console.log('Vote with the same month already exists');
        // Send a response indicating that a vote for the same month already exists
        // res.status(409).json({ message: 'Vote for the same month already exists' });
    }
    // Send a success response if the vote is saved successfully
    res.status(201).json({ message: 'Vote data saved successfully' });
  } catch (err) {
    // Handle errors
    console.error('Error saving vote data:', err);
    res.status(500).json({ message: 'Failed to save vote data', error: err.message });
  }
});

router.delete('/votesData_delete', async (req, res) => {
  try {
    // Delete all documents in the votes data collection
    await Vote.deleteMany({});
    res.status(200).json({ message: 'All votes data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete votes data' });
  }
});





module.exports = router;
