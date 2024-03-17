import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../Constant/constant';
import Login from '../Components_client/Login';
// import Finished from '../Components_client/Finished';
import Connected from '../Components_client/Connected';
import '../App.css';
import axios from 'axios';
import Swal from 'sweetalert2';
// import Homepage from './Homepage';

function Mainpage() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);
  const [hasRecordedData, setHasRecordedData] = useState(false);
  // let isDataSending = false;
  
  useEffect(() => {
    async function fetchData() {
      if (!votingStatus) {
          await recordVoteData();
          await Swal.fire({
            title: 'Voting is closed.',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false,
            willClose: () => {
              window.location.href = './Home';
            }
          });
      }
      await getCandidates();
      await getRemainingTime();
      await getCurrentStatus();
      await getUserData();

  }
  fetchData();
    // Add event listener for Metamask account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    // Remove event listener when component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };

    
  }, [votingStatus]);
  
  
  async function vote(number) {
    console.log('Voting with number:', number);
    try {
      if (typeof number !== 'undefined' && number !== null) {// Check if voting time has ended
          // Voting process
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const contractInstance = new ethers.Contract(
            contractAddress, contractAbi, signer
          );
          console.log('Voting for number:', number);
          const tx = await contractInstance.vote(number);
          await tx.wait();
  
          console.log('Voting transaction successful.');
  
          // Fetching candidates
          console.log('Fetching candidates...');
          getCandidates();
  
          canVote();
        } else {
          console.error('Voting time has ended.');
          // Voting time has ended, record vote data
          await recordVoteData();
        }
    } catch (error) {
      console.error('Error while voting:', error);
      // Handle error here
    }
  }
  
  async function recordVoteData() {
      try {
        const userData = await getUserData();
        console.log('User data:', userData);

        // Mapping user data to user names
        const userNames = userData.map(user => `${user.p_name} ${user.s_name}`);
        console.log('User names:', userNames);
        // Processing vote data
        console.log('Processing vote data...');
        console.log(candidates);

        const candidateVotes =  candidates.reduce((accumulator, candidate) => {
          const candidateName = candidate.name;
          const matchingUser = userNames.find(user => user.includes(candidateName));
          if (matchingUser) {
              const codeId = userData.find(user => `${user.p_name} ${user.s_name}` === matchingUser).code_id;
              accumulator[codeId] = (accumulator[codeId] || 0) + candidate.voteCount;
          } else {
              console.warn(`No matching user found for candidate: ${candidateName}`);
          }
          return accumulator;
      }, {});
      
        console.log('Candidate votes:', candidates);
        // Creating vote summary
        console.log('Creating vote summary...');

        const voteSummary = {
          name_vote: "VotingSummary",
          votes: candidateVotes,
          endDate: new Date().toISOString()
        };
        console.log('Vote summary:', voteSummary);
        // Sending vote summary
        console.log('Sending vote summary...');
        await sendVotesSummary(voteSummary);
        setHasRecordedData(true);
        console.log(candidates);
      } catch (error) {
        console.error('Error while recording vote data:', error);
        // Handle error here
      }
  }
  
  async function canVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const voteStatus = await contractInstance.voters(await signer.getAddress());
    setCanVote(voteStatus);
  
    // Record vote data
    
  }
  
  async function getCandidates() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const candidatesList = await contractInstance.getAllVotesOfCandidates();
    const formattedCandidates = candidatesList.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber()
      }
    });
    setCandidates(formattedCandidates);
  }

  async function getCurrentStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const status = await contractInstance.getVotingStatus();
    // console.log(status);
    setVotingStatus(status);
  }

  async function getRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const time = await contractInstance.getRemainingTime();
    const totalSeconds = parseInt(time, 16); // Convert hexadecimal string to integer

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // เก็บค่าในรูปแบบของชั่วโมง (Hr), นาที (Min), และวินาที (Sec)
    const formattedTime = `${hours} Hr ${minutes} Min ${seconds} Sec`;

    setremainingTime(formattedTime);
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      canVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
    window.location.reload();
  }

  async function connectToMetamask() {
    if (window.ethereum && votingStatus) {
      try {
        // Connect to MetaMask provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        // Request account access from MetaMask
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        // Check if the address exists in the system
        const userExists = await checkUserExists(address);

        if (userExists) {
          // If the user exists, fetch user data
          const userData = await getUserData_address(address);
          console.log("User data:", userData);

          // Set user token or perform other actions with the user data
          // Set user token to Local Storage
          localStorage.setItem('userToken', userData.token);
          // Assuming there is a function named setToken

          canVote();// Proceed to vote or perform other actions
        } else {
          // If the user does not exist, redirect to Home page
          console.log("User not found in the system. Redirecting to Home page.");
          window.location.href = "./Home";
        }

        console.log("Metamask Connected : " + address);
        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  }

  async function checkUserExists(address) {
    try {
      // Call the API to check if the user exists
      const response = await axios.get(`http://localhost:8000/users`);
      const users = response.data;
      return users.some(user => user.address_web3 === address); // Return true if the user exists, false otherwise
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false; // Return false if there is an error
    }
  }

  async function getUserData_address(address) {
    // Function to fetch user data based on the address
    try {
      // Call the API to fetch user data
      const response = await axios.get(`http://localhost:8000/users`);
      const users = response.data;
      return users.find(user => user.address_web3 === address); // Return the user data if found, otherwise null
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null; // Return null if there is an error
    }
  }

  async function handleNumberChange(index) {
    setNumber(index);
  }

  async function getUserData() {
    const response = await axios.get('http://localhost:8000/users');
    const userData = response.data;

    // Filter out users who are candidates
    const candidateUsers = userData.filter(user => user.roles.includes("candidate"));

    return candidateUsers;
  }

  // ส่งข้อมูลโหวตผ่าน API
  async function sendVotesSummary(voteSummary) {

      try {
        const response = await axios.post('http://localhost:8000/votesData', voteSummary);
        console.log("Votes summary sent successfully:", response.data);
      } catch (error) {
        console.error("Failed to send votes summary:", error);
      }
  }
  
  // ฟังก์ชันสำหรับปิดการโหวต
  // async function handleVoteClose() {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
  //     const signer = provider.getSigner();
  //     const contractInstance = new ethers.Contract(
  //       contractAddress, contractAbi, signer
  //     );
  //     // เรียกฟังก์ชันในสัญญาอัจฉริยะเพื่อปิดการโหวต
  //     const tx = await contractInstance.closeVoting();
  //     await tx.wait();
  //     console.log("Voting closed successfully");
  //   } catch (error) {
  //     console.error("Error closing voting:", error);
  //   }
  // }

  return (
    <>
      <div className="App">
      {votingStatus && isConnected && !hasRecordedData ? (
        <Connected
          account={account}
          candidates={candidates}
          remainingTime={remainingTime}
          number={number}
          handleNumberChange={handleNumberChange}
          voteFunction={vote}
          showButton={CanVote}
        />
      ) : (
        <>
          <Login connectWallet={connectToMetamask} />
        </>
      )}

        

      </div>
    </>
  );
}

export default Mainpage;
