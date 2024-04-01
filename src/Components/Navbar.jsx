import React ,{useState,useEffect} from 'react'
import '../StylesSheet/Login_admin.css'


export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // ตัวแปรสำหรับเก็บสถานะการเข้าสู่ระบบ

    // ฟังก์ชันสำหรับตรวจสอบ Token ใน localStorage เมื่อโหลดคอมโพเนนต์
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // ฟังก์ชันสำหรับออกจากระบบ
    const handleLogout = () => {
        deleteToken();
        setIsLoggedIn(false);
    }
    
    const Login = () =>{
      window.location.href ='/'
    }
    // ฟังก์ชันสำหรับลบ Token ออกจาก localStorage
    function deleteToken() {
        localStorage.clear();
        window.location.reload();
    }

  return (
  <>
    <nav className="navbar navbar-expand-lg shadow" 
    style={{ backgroundColor:"transparent",backdropFilter: "blur(75px)" }}>

      <div className="container">
        <h1 className="fonty navbar-brand" 
        style={{ color: "#FCFBF7", fontSize: "55.5px" }}>VOTEMAI</h1>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <a className="" aria-current="page" href="/Home">Home</a> */}
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#">Link</a> */}
            </li>
            {/* <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li> */}
          </ul>
        
          {isLoggedIn ? ( 
               <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            ) : (
              <button className="btn btn-outline-success"onClick={Login} >Login</button>
           )}
       
        </div>
      </div>
    </nav>
  </>
  )
}
