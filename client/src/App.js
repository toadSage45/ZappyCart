import React from "react";
import { Routes, Route } from "react-router-dom";









import Login from "./pages/auth/Login.js";
import Register from "./pages/auth/Register.js";
import Home from "./pages/Home.js";
import Header from "./components/nav/Header.js";
function App() {
  return (<>
    <Header/>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
    </>
  );
}

export default App;
