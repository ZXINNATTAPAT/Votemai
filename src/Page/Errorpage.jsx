import React from 'react'

export default function Errorpage(props) {
    
    function reload() {
      window.location.reload();
    }
    return (
      <div className='container'>
        <div className='card shadow-sm p-2 mb-3  rounded' style={{ border: "none", marginTop: "35vh", textAlign: "center" }}>
          <div className='card-body'>
            <h1 className="fonty d" style={{ color: "#765AFF", fontSize: "75.5px" }}>VOTEMAI</h1><br />
            <h4 className='card-text'>
              <i className="em em-pray" aria-label="PERSON WITH FOLDED HANDS"></i> Please log in to <span style={{ color: "orange" }}>METAMASK</span> or
              <br />contact the staff for further assistance. Thank you.
            </h4><br />
            {props.status === true ? (
                <i ><a className='card-text' onClick={reload} href='#sda'>Click here to login Metamask</a></i>
            ) : (
                <h5 style={{color:'blue'}}>Sorry Voting has closed !</h5>
            )}
          </div>
        </div>
      </div>
    )
  }
  
