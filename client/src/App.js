import React from "react";
import { Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css';
import { createStore } from 'redux'







import Login from "./pages/auth/Login.js";
import Register from "./pages/auth/Register.js";
import Home from "./pages/Home.js";
import Header from "./components/nav/Header.js";
import RegisterComplete from "./pages/auth/RegisterComplete.js";


function App() {
  return (<>
    <Header/>
    <ToastContainer/>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/register/complete" element={<RegisterComplete />} />
    </Routes>
    </>
  );
}

export default App;
