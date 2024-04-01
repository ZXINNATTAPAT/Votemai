import React, { useEffect } from 'react'
import VotingChart from './VotingChart'
import axios from 'axios';


export default function Votescores( {votesData , votesData2 ,verifyData} ) {

  console.log(votesData2);
  console.log(votesData);

  const Dataform = {
    _id: votesData._id,
    name_vote: votesData2.name_vote,
    votes: votesData2.votes,
    endDate: votesData2.endDate,
    IpfsHash: votesData.IpfsHash
  }
  // console.log(Dataform);

      const sendDataRepost = async (data) => {
        try {
            // Send a PUT request to the server API endpoint
            const response = await axios.put('http://localhost:8000/votesData-repost', data);

            // Log the response from the server
            console.log('Response from server:', response.data);
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error sending data to server:', error);
        }
    };

    const onsendrepost = async () => {
      try {
          // Update Dataform here
          sendDataRepost(Dataform);
          window.location.reload();
      } catch (error) {
          console.error('Error:', error);
          // Handle the error here
      }
  };

    return (
      <> 
        <div className='row g-3'>
          <div className='col'>
            <div className='card shadow-sm' style={{border:"none"}}>
                <div className='card-body'>
                    <div className='card-text'>
                      <h3>Latest Voting</h3>
                        <VotingChart votingData={votesData} />
                    </div>
                </div>
            </div>
            <br/>
          
            <div className='card shadow-sm' style={{border:"none"}}>
                <div className='card-body'>
                    <div className='card-text'>
                      <h3>Latest Voting In IPFS</h3>
                        <VotingChart votingData={votesData2} />
                    </div>
                </div>
            </div>
          </div>

          <div className='col'>
            <div className='card shadow-sm' style={{border:"none"}}>
              <div className='card-body'>
                <div style={{width:"auto"}}>
                    <table className="table table-striped table-hover">
                      <thead>
                          <tr>
                              <th scope="col">#</th>
                              <th scope="col">Name</th>
                              <th scope="col">Votes</th>
                          </tr>
                      </thead>
                      <tbody>
                          {votesData && Object.entries(votesData.votes)
                              .sort((a, b) => b[1] - a[1]) // เรียงลำดับจากมากไปน้อย
                              .map(([name, votes], index) => (
                                    <tr scope="row" key={index}>
                                        <td>{index + 1}</td>
                                        <td>{name}</td>
                                        <td>{votes}</td>
                                    </tr>
                              ))}
                      </tbody>
                  </table>
                </div>
              </div>
            </div>
            <br/>

              {verifyData ? (
                       <>
                          <div className=' alert alert-danger' 
                            style={{ textAlign:"center" }} role="alert">
                                  Inspected and found an error. in the database system
                          </div>
                          <button className='btn btn-primary' 
                            onClick={onsendrepost}>repost</button>
                        </>
                      ) : (
                          <div>
                              <div className='alert alert-success' 
                                style={{ border: "none",textAlign:"center"  }}  role="alert">
                                  Normal and safe information
                              </div>
                          </div>
                      )}<br/>

                      
              </div>


        </div>
      


      </>
    
    )
}
