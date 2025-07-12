import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
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
import CategoryUpdate from "./pages/admin/category/CategoryUpdate.js";
import SubCreate from "./pages/admin/sub/SubCreate.js";
import SubUpdate from "./pages/admin/sub/SubUpdate.js";
import ProductCreate from "./pages/admin/product/ProductCreate.js";
import AllProduct from "./pages/admin/product/AllProduct.js";
import ProductUpdate from "./pages/admin/product/ProductUpdate.js";
import Product from "./pages/product.js";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SideDrawer from "./components/drawer/SideDrawer.js";







function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscirbe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            console.log(res.data);
            dispatch(loggedInUser({
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            }));
          })
          .catch(err => console.log(err));
      }
    })
    return () => unsubscirbe();
  }, [])


  return (<>
    <Header />
    <SideDrawer/>
    <ToastContainer />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/register/complete" element={<RegisterComplete />} />
      <Route exact path="/forgot/password" element={<ForgotPassword />} />
      <Route exact path="/product/:slug" element={<Product />} />
      <Route exact path="/category/:slug" element={<CategoryHome />} />
      <Route exact path="/sub/:slug" element={<SubHome />} />
      <Route exact path="/shop" element={<Shop />} />
      <Route exact path="/cart" element={<Cart />} />

      {/* protected routes */}
      <Route path="/user/history" element={<UserRoute>  <History />  </UserRoute>} />
      <Route path="/user/password" element={<UserRoute>  <Password />  </UserRoute>} />
      <Route path="/user/wishlist" element={<UserRoute>  <Wishlist />  </UserRoute>} />
      <Route path="/admin/dashboard" element={<AdminRoute>  <AdminDashboard />  </AdminRoute>} />
      <Route path="/admin/category" element={<AdminRoute>  <CategoryCreate />  </AdminRoute>} />
      <Route path="/admin/category/:slug" element={<AdminRoute>  <CategoryUpdate />  </AdminRoute>} />
      <Route path="/admin/sub" element={<AdminRoute>  <SubCreate />  </AdminRoute>} />
      <Route path="/admin/sub/:slug" element={<AdminRoute>  <SubUpdate />  </AdminRoute>} />
      <Route path="/admin/sub" element={<AdminRoute>  <SubCreate />  </AdminRoute>} />
      <Route path="/admin/product" element={<AdminRoute>  <ProductCreate />  </AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute>  <AllProduct />  </AdminRoute>} />
      <Route path="/admin/product/:slug" element={<AdminRoute>  <ProductUpdate />  </AdminRoute>} />

    </Routes>
  </>
  );
}

export default App;
