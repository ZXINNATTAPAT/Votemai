import React, { useState ,useEffect } from "react";
// import Navbar from "../Components/Navbar";
import axios from 'axios';
import Swal from 'sweetalert2';
import '../StylesSheet/Component.css'

const Connected = (props) => {

  const [user, setuser] = useState([]);
  const [number, setNumber] = useState(props.number);
  const [Approve,SetApprove] = useState(false);
  
  const updateVote = async () => {
        try {
        const requestData = {
          address_web3: props.account,
          code_id: user.code_id,
          system_req: "vote_sucess"
        };
        console.log(requestData);

        const response = await axios.post('http://localhost:8000/update-vote', requestData);

        if (response.status === 200) {
          console.log('Vote updated successfully');
          console.log('New vote count:', response.data.newVoteCount);
        } else {
          console.log('Failed to update vote');
        }
      } catch (error) {
        console.error('Error updating vote:', error);
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // หยุดการกระทำของฟอร์มเมื่อถูกส่ง
    props.voteFunction(number);
    if(!props.button){
      updateVote();
    }
  };

 
  useEffect(() => {
    props.handleNumberChange(number);
  }, [number ,props]); // Empty dependency array to run the effect only once after the initial render

  // useEffect(() =>{
  //   if(Approve){
  //     Swal.fire({
  //       title: 'You have already voted.',
  //       icon: 'success',
  //       timer: 3500,
  //       showConfirmButton: false,
  //       willClose: () => {
  //         // Reload the page when the timer ends
  //         window.location.reload();
  //       }
  //     });
  //   }
  // })

  useEffect(() => {
    const checkUserExistence = async () => {
        try {
            // Call the API to check if the user exists
            const response = await axios.get(`http://localhost:8000/users`);
            const users = response.data;
            const userExists = users.some(user => user.address_web3 === props.account && user.vote === 1); // Check if the user exists
            const userdata = users.find(user =>user.address_web3 === props.account);
            
            setuser(userdata);
            console.log(props.account);
            console.log(userdata)
            // Update the state based on the result
            SetApprove(userExists);
            // Show a loading message with a timer if the user has not voted yet
            if (!userExists) {
                Swal.fire({
                    title: "Please wait for the official to approve.",
                    timer: 200000, // Timer duration in milliseconds
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    willClose: () => {
                        // Reload the page when the timer ends
                        window.localStorage.clear();
                        window.location.reload();
                        
                    }
                }).then((result) => {
                    // Handle dismissals if needed
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");
                        // Reload the page when the timer ends
                        window.localStorage.clear();
                        window.location.reload();
                        
                    }
                });
            }
            
        } catch (error) {
            console.error('Error checking user existence:', error);
            SetApprove(false); // Set approve to false if there is an error
        }
    };

    // Call the function to check user existence initially
    checkUserExistence();

    // Set an interval to check user existence and update the data every 30 seconds
    const interval = setInterval(checkUserExistence(), 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
}, [props.account]);

  
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
      {Approve ? (
        <>
          {/* <Navbar /> */}
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
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default Connected;
