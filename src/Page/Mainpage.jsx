import React ,{ useState, useEffect } from 'react';
import {ethers} from 'ethers';
import {contractAbi, contractAddress} from '../Constant/constant';
import axios from 'axios';
import Login from '../Components_client/Login';
import Finished from '../Components_client/Finished';
import Connected from '../Components_client/Connected';
import '../App.css';

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
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });


  async function vote() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );

      const tx = await contractInstance.vote(number);
      await tx.wait();
      canVote();
  }

  async function vote() {
    // โหลด provider จาก window.ethereum
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
    );

    const tx = await contractInstance.vote(number);// ทำการโหวต
    await tx.wait();

    getCandidates();// เรียกใช้ฟังก์ชันเพื่ออัปเดตข้อมูลผู้สมัคร

    const voteData = await contractInstance.getAllVotesOfCandiates();// รับข้อมูลการโหวตทั้งหมด

    // นับจำนวนโหวตของแต่ละ Candidate
    const candidateVotes = {};
    voteData.forEach(candidate => {
        candidateVotes[candidate.code_id] = (candidateVotes[candidate.code_id] || 0) + 1;
    });

    // ส่งข้อมูล votes ผ่าน API เมื่อโหวตเสร็จสิ้น
    const voteSummary = {
        name_vote:"VotingSummary",
        votes: candidateVotes,
        endDate: new Date().toISOString()  // ใส่วันสิ้นสุดของข้อมูลที่นี่
    };
    sendVotesSummary(voteSummary);

    // เรียกฟังก์ชันอื่นๆ ตามต้องการ
    canVote();
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

  async function getCandidates() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const candidatesList = await contractInstance.getAllVotesOfCandiates();
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
