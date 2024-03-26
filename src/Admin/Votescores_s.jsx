import React from 'react'
import VotingChart from './VotingChart'

export default function Votescores( {votesData} ) {
  return (
    <> 
      <div className='row'>
        <div className='col'>
          <div className='card shadow-sm' style={{border:"none"}}>
            <div className='card-body'>
              <div style={{width:"auto" ,height:"400px"}}>
                <VotingChart votingData={votesData} />
              </div>
            </div>
          </div>
        </div>

        <div className='col'>
          <div className='card shadow-sm' style={{border:"none"}}>
            <div className='card-body'>
              <div style={{width:"auto" ,height:"400px"}}>
                {Object.values(votesData.votes[0].votes)}
              </div>
            </div>
          </div>
        </div>

      </div>
     


    </>
   
  )
}
