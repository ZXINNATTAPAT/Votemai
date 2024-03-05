import React from 'react'
import '../StylesSheet/Login_admin.css'

export default function Navbar() {
  function deletetoken(){
    localStorage.clear("token");

}
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <div>
            <h1 className="fonty " style={{color:"#765AFF",fontSize:"55.5px"}}>VOTEMAI</h1>
          </div>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                  <li class="nav-item">
                  <a class="nav-link active " aria-current="page" href="#">Home</a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link" href="#">Features</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                  </li>
              </ul>
            </div>

            <button className='btn btn-primary' onClick={deletetoken}>Logout</button>
        </div>
        
    </nav>
  )
}
