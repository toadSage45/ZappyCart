import React , {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css';






import Login from "./pages/auth/Login.js";
import Register from "./pages/auth/Register.js";
import Home from "./pages/Home.js";
import Header from "./components/nav/Header.js";
import RegisterComplete from "./pages/auth/RegisterComplete.js";


import { useDispatch } from 'react-redux';
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { loggedInUser } from "./features/user/userSlice.js";






function App() {

  const dispatch = useDispatch();
  useEffect( () => {
    const unsubscirbe = onAuthStateChanged(auth , async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch(loggedInUser({
          email : user.email ,
          token : idTokenResult.token,
        }));
      }
    })
    return () => unsubscirbe();
  } , [])


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
