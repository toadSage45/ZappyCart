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
import ForgotPassword from "./pages/auth/ForgotPassword.js";
import { currentUser } from "./functions/auth.js";
import History from "./pages/user/History.js";
import UserRoute from "./components/routes/UserRoute.js";
import Password from "./pages/user/Password.js";
import Wishlist from "./pages/user/Wishlist.js";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import AdminRoute from "./components/routes/AdminRoute.js";
import CategoryCreate from "./pages/admin/category/CategoryCreate.js";






function App() {

  const dispatch = useDispatch();
  useEffect( () => {
    const unsubscirbe = onAuthStateChanged(auth , async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
              .then((res) => {
                console.log(res.data);
                dispatch(loggedInUser({
                  name : res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role : res.data.role , 
                  _id : res.data._id,
                }));
              })
              .catch(err => console.log(err));
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
      <Route exact path="/forgot/password" element={<ForgotPassword />} />

      
      {/* protected routes */}
      <Route path="/user/history" element={ <UserRoute>  <History />  </UserRoute> }/>
      <Route path="/user/password" element={ <UserRoute>  <Password />  </UserRoute> }/>
      <Route path="/user/wishlist" element={ <UserRoute>  <Wishlist />  </UserRoute> }/>
      <Route path="/admin/dashboard" element={ <AdminRoute>  <AdminDashboard />  </AdminRoute> }/>
      <Route path="/admin/category" element={ <AdminRoute>  <CategoryCreate />  </AdminRoute> }/>


    </Routes>
    </>
  );
}

export default App;
