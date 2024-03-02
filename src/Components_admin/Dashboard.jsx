import React from 'react'
import Navbar from '../Components_page/Navbar'

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user);

  return (
    <>
        <Navbar />
        <br />
        <div className='container'>
          <div className='container'>
            <h1>Dashboard</h1> 
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quam reprehenderit velit nam soluta nobis fugiat sapiente non, possimus reiciendis, similique, modi fugit earum voluptatibus enim amet nesciunt adipisci error.</p>
            <br/>
            <div className='row'>
              <div className='col-p'>
                 <div class="card btn btn-outline-primary">
                  <div class="card-body">
                      <h3 className='card-text'>Add people eligible to vote</h3>
                      {/* <button className='btn btn-primary'>choose</button> */}
                  </div>
                </div><br/>
              </div>
               
              <div className='col-p'>
                  <div class="card btn btn-outline-primary">
                    <div class="card-body">
                        <h3 className='card-text'>Add a candidate</h3>
                        {/* <button className='btn btn-primary'>choose</button> */}
                    </div>
                  </div><br/>
              </div>

                <div className='col-p'>
                  <div class="card btn btn-outline-primary">
                    <div class="card-body">
                        <h3 className='card-text'>Overview of voting scores</h3>
                        {/* <button className='btn btn-primary'>choose</button> */}
                    </div>
                  </div><br/>
                </div>

                <div className='col-p'>
                  <div class="card btn btn-outline-primary">
                    <div class="card-body">
                        <h3 className='card-text'>Manage the voting system</h3>
                        {/* <button className='btn btn-primary'>choose</button> */}
                    </div>
                  </div><br/>
                </div>
              </div>

              

          </div>
           
        </div>
    </>
  )
}
