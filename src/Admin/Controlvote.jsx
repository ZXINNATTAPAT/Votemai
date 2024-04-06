import React ,{useState} from 'react'
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../Constant/constant';
import axios from 'axios';

export default function Controlblockchain() {
    const [duration, setDuration] = useState(0);

  const connectToMetaMask = async () => {
      if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          return signer;
      } else {
          console.error('MetaMask not detected');
          return null;
      }
  }

  const stopVoting = async () => {
      const signer = await connectToMetaMask();
      if (signer) {
          const contractInstance = new ethers.Contract(
            contractAddress, contractAbi, signer
          );
          const transaction = await contractInstance.stopVoting();
          await transaction.wait();
          console.log('Voting stopped');
      } else {
          console.error('Failed to connect to MetaMask');
      }
  }

  const clearData = async () => {
      const signer = await connectToMetaMask();
      if (signer) {
          const contractInstance = new ethers.Contract(
            contractAddress, contractAbi, signer
          );
          const transaction = await contractInstance.clearData();
          await transaction.wait();
          console.log('Data cleared');
      } else {
          console.error('Failed to connect to MetaMask');
      }
  }

  const setEnd = async (e) => {
    e.preventDefault();
      const signer = await connectToMetaMask();
      if (signer) {
          const contractInstance = new ethers.Contract(
            contractAddress, contractAbi, signer
          );
          const transaction = await contractInstance.setVotingEnd(duration);
          await transaction.wait();
          console.log('Voting end time set');
      } else {
          console.error('Failed to connect to MetaMask');
      }
  }

  const addCandidates = async () => {
    const response = await axios.get('https://votemai-api-cts.vercel.app/users');
    const userData = response.data;

    // Filter out users who are candidates
    const candidateUsers = userData.filter(user => user.roles.includes("candidate"));

    // Format the names of candidate users
    const candidateNames = candidateUsers.map(user => `${user.p_name} ${user.s_name}`);

    try {
        const signer = await connectToMetaMask();
        if (signer) {
            const contractInstance = new ethers.Contract(
                contractAddress, contractAbi, signer
            );
            
            // Loop through candidateNames array and add each candidate individually
            
                const transaction = await contractInstance.addCandidates(candidateNames);
                await transaction.wait();
                console.log(`Candidate ${candidateNames} added`);
            
            // await addCandidates();
        } else {
            console.error('Failed to connect to MetaMask');
        }
    } catch (error) {
        console.error('Error adding candidates:', error);
    }
}





  return (
    <>
     <div>

                <br/>
                <div className='card shadow-sm' style={{ border: 'none' }}>
                    <div className='card-body'>
                        <h3 className='card-title'>Close voting</h3>
                        <div className='card-text'>
                            <p>Voting is closed with Admin.</p>
                            <button className='btn btn-primary mr-2' onClick={stopVoting}>Stop Voting</button>
                        </div>
                        
                    </div>
                </div><br/>

                <div className='card shadow-sm' style={{ border: 'none' }}>
                    <div className='card-body'>
                        <h3 className='card-title'>Clear Data</h3>
                        <div className='card-text'>
                            <p>Reset all votes. (Set the vote count value to 0)</p>
                            <button className='btn btn-danger mr-2' onClick={clearData}>Clear Data</button>
                        </div>
                        
                    </div>
                </div><br/>

                <div className='card shadow-sm' style={{ border: 'none' }}>
                    <div className='card-body'>
                        <h3 className='card-title'>Add New candidates</h3>
                        <div className='card-text'>
                            <p>Add New candidates in smartcontract</p>
                            <button className='btn btn-primary mr-2' onClick={addCandidates}>Add</button>
                        </div>
                        
                    </div>
                </div><br/>

                <div className='card shadow-sm' style={{ border: 'none' }}>
                    <div className='card-body'>
                    <h3 className='card-title'>Set Time Vote</h3>
                    <div className='card-text'>
                        <form class="row">
                            <p>Voting deadlines </p>
                            <div className='col'>
                                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className='form-control  mb-3' />
                            </div>
                            <div className='col'>
                                <button className='btn btn-info mb-3' onClick={setEnd} >Set End Time</button>
                            </div>
                        </form>
                    </div>

                         
                    </div>
                </div>
                

            
               
                            
                <br />
          
      
     </div>
    </>
  )
}
