import React from 'react'
import '../StylesSheet/Login_admin.css'

export default function Navbar() {
  function deletetoken(){
    localStorage.clear("token");

}
  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: "white" }}>
            <div className="container">
               <h1 className="fonty navbar-brand" style={{ color: "#765AFF", fontSize: "55.5px" }}>VOTEMAI</h1>

               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
                
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                      </ul>
                      <div className="d-flex" >
                        {/* <button className="btn btn-primary" onClick={deletetoken}>Logout</button> */}
                      </div>
                    </div>
            </div>
        </nav>
  )
}
