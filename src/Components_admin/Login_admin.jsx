import React from 'react'
// import Navbar from '../Components_page/Navbar'
import {ethers} from 'ethers';
import '../StylesSheet/Login_admin.css'


export default function Login_admin() {

    //ไว้login Metamask
    async function connectToMetamask(e) {
        e.preventDefault();
        if (window.ethereum) { // Checks if MetaMask is installed
            try {
                // Creates a new Web3Provider using the current Ethereum provider (MetaMask)
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                
                // Requests user permission to access their accounts through MetaMask
                await provider.send("eth_requestAccounts", []);
                
                // Gets the signer (account) from the provider
                const signer = provider.getSigner();
                
                // Retrieves the Ethereum address of the connected account
                const address = await signer.getAddress();
                
                // Logs the connected address to the console
                console.log("Metamask Connected: " + address);
                
                // Call your API auth endpoint with the Ethereum address
                const response = await fetch('http://localhost:8000/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ address_web3: address })
                });
                const data = await response.json();
                console.log(data); 

                if (data.token) {
                    // Store token in localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));

                }

                window.location.href = "/Main_Dashboard";
                // Additional actions can be performed here, such as setting state variables or invoking other functions
            } catch (err) {
                console.error(err); // Logs any errors that occur during the process
            }
        } else {
            console.error("Metamask is not detected in the browser"); // Logs an error message if MetaMask is not installed
        }
    }
    
    
    
  return (
    <>
     {/* <Navbar /><br/> */}
        <br/>
        <div className='container' style={{marginTop:"20vh"}}>
            <div className='card' >
                <div className='card-body'>
                    <br/>
                    <section className='row '>

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

                        <section className="col-lg-5 ">
                            <div className='card'>
                                <div className="card-body">
                                    <div className="bg-logo" style={{ width: "100%", height: "350px",backgroundSize: "cover" }}>
                                        {/* You can add content inside the div if needed */}
                                    </div>
                                    {/* Add any additional content or text for your card */}
                                    {/* <h5 className="card-title">Card Title</h5>
                                    <p className="card-text">Some quick example text to build on the card.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a> */}
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
