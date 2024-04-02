import React  from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./Page/Mainpage";
import Loginadmin from "./Admin/Login_admin";
import Controlpage from "./Page/Controlpage";
import Homepage from "./Page/Homepage";
// import Login from "./Client/Login";


function App() {

return (
  <>
    <BrowserRouter>
      <Routes>
        {/* <Route path={`Home-page-main/${encryptedPath}`} element={<Homepage />} /> */}
        {/* <Route path="/tlogin" element={<Login/>} /> */}
        {/* <Route path={`/${encryptedPath2}`} element={<Mainpage />} /> */}
        {/* <Route path="/deploy" element={<DeployContract/>} /> */}
        <Route path="/" element={<Homepage />} />
        <Route path="/Home-page-main" element={<Mainpage />} />
        <Route path="/dashboard" element={<Loginadmin />} />
        <Route path="/Main_Dashboard" element={<Controlpage />} />
      </Routes>
    </BrowserRouter>
  </>
);

}

export default App;
