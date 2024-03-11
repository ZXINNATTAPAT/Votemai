import React ,{ useState, useEffect } from 'react';
import {ethers} from 'ethers';
import {contractAbi, contractAddress} from '../Constant/constant';
import Login from '../Components_client/Login';
import Finished from '../Components_client/Finished';
import Connected from '../Components_client/Connected';
import '../App.css';
import axios from 'axios';


function Mainpage() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);
  

  useEffect( () => {
    // setVotingStatus(true);
    // getAllVotesOfCandidates();
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    handleNumberChange();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });


  // async function vote() {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
  //     const signer = provider.getSigner();
  //     const contractInstance = new ethers.Contract (
  //       contractAddress, contractAbi, signer
  //     );

  //     const tx = await contractInstance.vote(number);
  //     await tx.wait();
  //     canVote();
  // }

    async function vote() {
      try {
          const provider = new ethers.providers.Web3Provider(window.ethereum); // Load provider from window.ethereum
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const contractInstance = new ethers.Contract(
              contractAddress, contractAbi, signer
          );
  
          const tx = await contractInstance.vote(number);// Vote
          await tx.wait();
  
          getCandidates();  // Update candidate data
  
          const voteData = await contractInstance.getAllVotesOfCandidates();// Get all votes

          const userData = getUserData();
          
          const userNames = userData.map(user => `${user.p_name} ${user.s_name}`);

          const candidateVotes = {};
          voteData.forEach(candidate => {
              const candidateName = candidate.name;
              const matchingUser = userNames.find(user => user.includes(candidateName));
              if (matchingUser) {
                  const codeId = userData.find(user => `${user.p_name} ${user.s_name}` === matchingUser).code_id;
                  candidateVotes[codeId] = (candidateVotes[codeId] || 0) + 1;
              }
          });

          const voteSummary = {
              name_vote: "VotingSummary",
              votes: candidateVotes,
              endDate: new Date().toISOString()
          };

          await sendVotesSummary(voteSummary);

          
  
  
          canVote();// Call other necessary functions
  
      } catch (error) {
          console.error('Error while voting:', error);
          // Handle error here
      }
  }
  
  async function canVote() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const voteStatus = await contractInstance.voters(await signer.getAddress());
      setCanVote(voteStatus);
  }
  // getAllVotesOfCandiates
  
  async function getCandidates() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
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
      const contractInstance = new ethers.Contract (
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
      const contractInstance = new ethers.Contract (
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
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
        canVote();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  async function getUserData() {
    const response = await axios.get('http://localhost:8000/users');
    return response.data;
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
  async function handleVoteClose() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress, contractAbi, signer
      );
      // เรียกฟังก์ชันในสัญญาอัจฉริยะเพื่อปิดการโหวต
      const tx = await contractInstance.closeVoting();
      await tx.wait();
      console.log("Voting closed successfully");
    } catch (error) {
      console.error("Error closing voting:", error);
    }
  }


  return (
    <>
    
    <div className="App">
      
    {votingStatus ? (
        isConnected ? (
          <React.Fragment>
              <Connected 
                account={account}
                candidates={candidates}
                remainingTime={remainingTime}
                number={number}
                handleNumberChange={handleNumberChange}
                voteFunction={vote}
                showButton={CanVote}
              />
                <button className='btn btn-primary' onClick={handleVoteClose}>Close Voting</button>
          </React.Fragment>
        ) : (
          <Login connectWallet={connectToMetamask} />
        )
      ) : (
        <Finished />
      )}


      

      
      
    </div>
   

    </>

  );

}

export default Mainpage;
