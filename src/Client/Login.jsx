import React from "react";
import Navbar from "../Components/Navbar";

const Login = (props) => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className='card card-set  p-2 mb-3  rounded' style={{marginTop: "20vh"}}>
                    <div className='card-body'>
                        <div className="card-text">
                            <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-2">
                                <div className="col">
                                    <h2 className="fonty d" style={{ color: "#765AFF", fontSize: "75.5px",textAlign:"center" ,marginTop:"40px"}}>VOTEMAI</h2>
                                    <p  style={{textAlign:"center",fontSize: "16.5px"}}>Blockchain Technology</p>
                                </div>
                                <div className="col"><br/>
                                    <h4 className=""><i className="em em-pray" aria-label="PERSON WITH FOLDED HANDS"></i> Welcome to decentralized voting application</h4><br/>
                                    <button className="btn  btn-outline-primary" onClick={props.connectWallet} >Login Metamask</button>
                                    <br/>
                                    <p style={{marginTop:"25px"}}><a className="" href="https://metamask.io/download/" >If you don't have one yet MetaMask Wallet</a></p>
                                    
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

export default Login;