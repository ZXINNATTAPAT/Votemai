import React from "react";
import Navbar from "../Components_page/Navbar";

const Finished = (props) => {
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="container">
                    <h1 className="fonty welcome-message" style={{fontSize:"70px",marginTop:"32vh"}}>Voting is Finished</h1>
                </div>
            </div>
            
        </>
    )
}

export default Finished;