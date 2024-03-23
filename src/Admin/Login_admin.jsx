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
        <div className='container' style={{marginTop:"20vh"}}>
            <div className='card shadow' style={{border:"none"}}>
                <div className='card-body'>
                    <br/>
                    <section className='row '>
                        
                        <section className="col-lg-5 a-dis-col">
                            <div className='card' style={{border:"none"}}>
                                <div className="card-body">
                                    <div className="bg-logo" style={{ width: "100%", height: "320px",backgroundSize: "cover" }} />
                                </div>
                            </div>
                        </section>

                        <section className='col-lg-7 '>
                            <div className='card' style={{border:"none"}}>
                                <div className='card-body'>
                                    <h1 className='card-title'>Login Admin</h1><br/>
                                    <form className=''>
                                    <div className="mb-3 row">
                                        <div className='col-lg'>
                                            <label for="staticEmail" className="form-label ">Email</label>
                                            <input type="text" className="form-control  p-2 "  disabled/>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <div className='col-lg'>
                                            <label for="inputPassword" className="form-label ">Password</label>
                                            <input type="password" className="form-control p-2 "  disabled/>
                                        </div>
                                       
                                    </div>
                                    <div className="mb-3 row">
                                        <div className='col-lg'>
                                            <button className='btn btn-primary  p-2 m-1 '>Submit</button>
                                        
                                            <button className='btn btn-warning  p-2 m-1' onClick={connectToMetamask} >Connect MetaMask</button>
                                            {/* <button className="login-button" onClick = {props.connectWallet}>Login Metamask</button> */}
                                        </div>
                                    </div>
                               </form>
                                </div>
                                
                            </div>
                           
                        </section>
                    </section>
                </div>
                <br/>
            </div><br/>
        </div>
    </>
  )
}
