import React  from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./Page/Mainpage";
import Loginadmin from "./Admin/Login_admin";
import Controlpage from "./Page/Controlpage";
import Homepage from "./Page/Homepage";

const encryptedPath = window.btoa("Home-page-main"); // เข้ารหัสพาธ "Home" เป็น Base64
const encryptedPath2 = window.btoa("Main-page-forvoteting-app"); // เข้ารหัสพาธ "Home" เป็น Base64

// console.log(encryptedPath2);

function App() {

return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path={`Home-page-main/${encryptedPath}`} element={<Homepage />} />
        <Route path="/Home-page-main" element={<Homepage />} />

        <Route path={`/${encryptedPath2}`} element={<Mainpage />} />
        <Route path="/" element={<Mainpage />} />
        
        <Route path="/dashboard" element={<Loginadmin />} />
        <Route path="/Main_Dashboard" element={<Controlpage />} />
      </Routes>
    </BrowserRouter>
  </>
);

}

export default App;
