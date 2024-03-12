import React ,{ useState, useEffect } from 'react';
import {ethers} from 'ethers';
import {contractAbi, contractAddress} from '../Constant/constant';
import Login from '../Components_client/Login';
// import Finished from '../Components_client/Finished';
import Connected from '../Components_client/Connected';
import '../App.css';
import axios from 'axios';
import Homepage from './Homepage';

function Mainpage() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);

  // console.log(candidates);
  useEffect( () => {
    if(!votingStatus){
      recordVoteData();
    }
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    // handleNumberChange();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  }, [votingStatus]);
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
  async function vote(number) {
    console.log('Voting with number:', number);
    try {
        if (typeof number !== 'undefined' && number !== null) {
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
            console.error('Error while voting: number is undefined or null');
        }
    } catch (error) {
        console.error('Error while voting:', error);
        // Handle error here
    }
}

  async function recordVoteData() {
    if(!votingStatus){
       try {
        // Fetching user data
        console.log('Fetching user data...');
        const userData = await getUserData();
        console.log('User data:', userData);

        // Mapping user data to user names
        console.log('Mapping user data...');
        const userNames = userData.map(user => `${user.p_name} ${user.s_name}`);
        console.log('User names:', userNames);

        // Processing vote data
        console.log('Processing vote data...');
        console.log(candidates);
        const candidateVotes = {};
        candidates.forEach(candidate => {
            const candidateName = candidate.name;
            const matchingUser = userNames.find(user => user.includes(candidateName));
            if (matchingUser) {
                const codeId = userData.find(user => `${user.p_name} ${user.s_name}` === matchingUser).code_id;
                candidateVotes[codeId] = (candidateVotes[codeId] || 0) + candidate.voteCount;
            }
        });

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
        window.location.href ="./Home"
        // Calling other necessary functions
        console.log('Calling other necessary functions...');
        console.log(candidates);
      } catch (error) {
          console.error('Error while recording vote data:', error);
          // Handle error here
      }
    }
    else{
      window.location.href="./Home"
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
      // Record vote data
  }
  
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
      
    {/* {votingStatus ? ( */}
        {isConnected ? (
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
        )}
      {/* ) : (
        <Homepage /> */}
      {/* ) */}
      


      

      
      
    </div>
   

    </>

  );

}

export default Mainpage;
