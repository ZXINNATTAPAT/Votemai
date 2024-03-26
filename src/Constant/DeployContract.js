import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './constant';

function DeployContract() {
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

  const setEnd = async () => {
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

  return (
      <div>
          <button onClick={stopVoting}>Stop Voting</button>
          <button onClick={clearData}>Clear Data</button>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <button onClick={setEnd}>Set End Time</button>
      </div>
  );
}

export default DeployContract;
