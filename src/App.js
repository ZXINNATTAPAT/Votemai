// import { useState, useEffect } from 'react';
// import {ethers} from 'ethers';
// import {contractAbi, contractAddress} from './Constant/constant';
// import Login from './Components/Login';
// import Finished from './Components/Finished';
// import Connected from './Components/Connected';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./Page/Mainpage";
import './App.css';
import Login_admin from "./Components_admin/Login_admin";
import Dashboard from "./Components_admin/Dashboard";
import Controlpage from "./Page/Controlpage";

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/Dashboard" element={<Login_admin />} />
          
          <Route path="/Main_Dashboard" element={<Controlpage />} />
        
        </Routes>
      </BrowserRouter>
    </>
  )



}


export default App;
