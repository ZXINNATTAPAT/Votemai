import React from 'react'

export default function Errorpage(props) {
    
    function reload() {
      window.location.reload();
    }
    return (
      <div className='container-fluid img-main-home2' style={{height:"100vh"}}>
        <div className='container'>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <div className='card shadow-sm p-2 mb-3  rounded' style={{ borderColor:"white",background:"transparent",backgroundColor:"rgb(40,40,40,0.25)",backdropFilter:"blur(20px)", textAlign: "center" }}>
            <div className='card-body'>
              {/* color: "#765AFF" */}
              <h1 className="fonty d" style={{ color:"white",fontSize: "75.5px" }}>VOTEMAI</h1><br />
              <h4 className='card-text' style={{color:"white"}}>
                <i className="em em-pray" aria-label="PERSON WITH FOLDED HANDS"></i> Please log in to <span style={{ color: "orange" }}>METAMASK</span> or
                <br />contact the staff for further assistance. Thank you.
              </h4><br />
              {props.status === true ? (
                  <i ><a className='card-text' onClick={reload} href='#sda'>Click here to login Metamask</a></i>
              ) : (
                  <h5 style={{color:'white'}}>Sorry Voting has closed !</h5>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
