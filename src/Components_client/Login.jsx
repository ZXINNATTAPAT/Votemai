import React from "react";
import Navbar from "../Components_page/Navbar";

const Login = (props) => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="container" style={{ marginTop: "30vh", textAlign: 'center' }}>
                    <h1 className="fonty" style={{ fontSize: "50px" }}>Welcome to decentralized voting application</h1>
                    <button className="btn btn-lg btn-primary" onClick={props.connectWallet} style={{ marginTop: "20px" }}>Login Metamask</button>
                </div>
            </div>
        </>
    )
}

export default Login;