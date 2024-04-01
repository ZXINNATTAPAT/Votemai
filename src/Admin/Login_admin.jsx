import React from 'react'
// import Navbar from '../Components_page/Navbar'
import {ethers} from 'ethers';
import '../StylesSheet/Login_admin.css'


export default function Login_admin() {

    function setToken(token) {localStorage.setItem('token', token);}

    async function connectToMetamask(e) {
        e.preventDefault(); 
        if (!window.ethereum) {
            console.error("MetaMask is not installed in the browser");
            return;
        }

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum); // Creates a new Web3Provider using the current Ethereum provider (MetaMask)
            await provider.send("eth_requestAccounts", []);// Requests user permission to access their accounts through MetaMask
            const signer = provider.getSigner();// Gets the signer (account) from the provider
            const address = await signer.getAddress();// Retrieves the Ethereum address of the connected account
            console.log("Metamask Connected: " + address);// Logs the connected address to the console
            const response = await fetch('http://localhost:8000/auth', {// Call your API auth endpoint with the Ethereum address
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ address_web3: address })
            });
            if (!response.ok) {
                throw new Error("Failed to authenticate user: " + response.statusText);
            }
            const data = await response.json(); // console.log(data);
            // Check if the user is an admin before creating and storing the token
            if (data.user && data.user.roles === 'admin' && data.token) {
                setToken(data.token);// Store token in localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                setTimeout(() => {
                    localStorage.removeItem("token");
                }, 3600000); // 1 hour in milliseconds
                window.location.href = "/Main_Dashboard";
            } else {
                console.error("Non-admin user detected. Access denied.");
            }
        } catch (error) {
            console.error("An error occurred while connecting to MetaMask:", error);
        }
    }
  return (
    <>
        <br/>
        <div className='container' >
        <div className='card card-set  p-2 mb-3  rounded' style={{marginTop: "25vh"}}>
                    <div className='card-body'>
                        <div className="card-text">
                            <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-2">
                                <div className="col">
                                    <h2 className="fonty d" style={{ color: "#765AFF", fontSize: "75.5px",textAlign:"center" ,marginTop:"40px"}}>VOTEMAI</h2>
                                    <p  style={{textAlign:"center",fontSize: "16.5px"}}>Blockchain Technology</p>
                                </div>
                                <div className="col"><br/>
                                    <h4 className="">ADMIN LOGIN</h4><br/>
                                    <button className="btn  btn-outline-primary" onClick={connectToMetamask} >Login Metamask</button>
                                    <br/>
                                    <p style={{marginTop:"25px"}}><a className="" href="https://metamask.io/download/" >If you don't have one yet MetaMask Wallet</a></p>
                                    
                                </div>
                            </div><br/>

                            <div className='card shadow-sm' style={{borderColor:"orange"}}>
                                <div className='card-body'>
                                    <p className='card-text'><i class="bi bi-exclamation-triangle" 
                                    style={{color:"orange"}}></i>  
                                         Please ensure that your <span><strong>Metamask</strong></span> login credentials are correct before proceeding. If you encounter login errors more than three times, please try again in 15 minutes. Thank you for your patience and understanding.
                                    </p>
                                </div>
                            </div>

                            

                           
                        </div>
                    </div>
                </div>

                   
                <footer style={{marginTop:"35vh"}}>
                    <div>
                        © 2024 Votemai. All rights reserved.
                    </div>
                </footer>
        </div>
    </>
  )
}
