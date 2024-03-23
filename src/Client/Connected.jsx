import React, { useState ,useEffect } from "react";
import Navbar from "../Components/Navbar";
import '../StylesSheet/Component.css'

const Connected = (props) => {

  const [number, setNumber] = useState(props.number);

  const handleSubmit = (e) => {
    e.preventDefault(); // หยุดการกระทำของฟอร์มเมื่อถูกส่ง
    props.voteFunction(number);
  };

  useEffect(() => {
    props.handleNumberChange(number);
  }, [number ,props]); // Empty dependency array to run the effect only once after the initial render

  //add props
  
  // Modify handleNumberChange to directly pass the value to props.handleNumberChange
  const handleNumberChange = (value) => {
    setNumber(value); // Update the local state
    console.log("New number:", value); // Log the new value of number
    props.handleNumberChange(value); // Pass the new value directly to props.handleNumberChange
  };

  const CandidateCard = ({ candidate, index }) => {
    return (
      <div className="card shadow-sm card-add-candidate h-100" onClick={() => handleNumberChange(index)} style={{ cursor: 'pointer', border: "none" }}>
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center" }}>{index}</h5>
                </div>
              </div>
            </div>
            <div className="col-8">
              <h5 className="card-title">{candidate.name}</h5>
              <p className="card-text">Votes: {candidate.voteCount}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CandidateList = ({ candidates }) => {
    return (
      <div className="row g-3">
        {candidates.map((candidate, index) => (
          <div className="col-md-4" key={index}>
            <CandidateCard
              candidate={candidate}
              index={index}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="container "><br /><br />
          <h1 className="fonty">You are <span className="text-primary">Connected</span> to Metamask</h1>
          <p className="">Account: {props.account}</p>
          <p className="">Remaining Time: {props.remainingTime}</p>
          {props.showButton ? (
            <div className="card shadow-sm " style={{ border: "none" }}>
              <div className="card-body">
                <h3 className="connected-account" style={{ textAlign: "center" }}><strong>You have already voted </strong></h3>
              </div>
            </div>
          ) : (
            <div className="row g-3">
              <div className="col">
              <form onSubmit={handleSubmit}>
                  <input
                    type="number"
                    placeholder="Enter Candidate Index"
                    value={number}
                    onChange={(e) => handleNumberChange(e.target.value)}
                    className="form-control"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Vote
                  </button>
                </form>
              </div>
            </div>
          )}<br />

          <CandidateList candidates={props.candidates} />

        </div>
      </div>
    </>
  )
}

export default Connected;
