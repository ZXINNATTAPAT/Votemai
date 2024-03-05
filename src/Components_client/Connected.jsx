import React from "react";
import Navbar from "../Components_page/Navbar";

const Connected = (props) => {

    //เขียนเก็บข้อมูลการ vote ไว้ 

    

    return (
        <>
        <Navbar />
        <div className="container "><br/>
            <h1 className="connected-header">You are Connected to Metamask</h1>
            <p className="connected-account">Metamask Account: {props.account}</p>
            <p className="connected-account">Remaining Time: {props.remainingTime}</p>
            { props.showButton ? (
                <p className="connected-account">You have already voted</p>
            ) : (
                
                <div className="row g-3">
                <div className="col">
                  <input
                    type="number"
                    placeholder="Enter Candidate Index"
                    value={props.number}
                    onChange={props.handleNumberChange}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <button
                    className="btn btn-primary"
                    onClick={props.voteFunction}
                  >
                    Vote
                  </button>
                </div>
              </div>
              
                
            )}
            <br/>
            <table id="myTable" className="table candidates-table">
                <thead>
                    <tr>
                    <th>Index</th>
                    <th>Candidate name</th>
                    <th>Candidate votes</th>
                    </tr>
                </thead>
                <tbody>
                    {props.candidates.map((candidate, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{candidate.name}</td>
                        <td>{candidate.voteCount}</td>
                    </tr>
                    ))}
                </tbody>
            </table><br/><br/>
            
        </div>
        </>
    )
}

export default Connected;