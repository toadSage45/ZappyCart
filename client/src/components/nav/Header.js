import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  ShopOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { logout } from "../../features/user/userSlice";
import Search from "../forms/Search";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("home");
  const { email, token, role } = useSelector((state) => state.user);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logoutUser = () => {
    signOut(auth);
    dispatch(logout());
    navigate("/login");
  };

  const mainMenuItems = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/shop">Shop</Link>,
      key: "shop",
      icon: <ShopOutlined />,
    },
    !email && {
      label: <Link to="/register">Register</Link>,
      key: "register",
      icon: <UserAddOutlined />,
    },
    !email && {
      label: <Link to="/login">Login</Link>,
      key: "login",
      icon: <LoginOutlined />,
    },
  ].filter(Boolean);

  const userMenuItem = email && {
    label: email.split("@")[0],
    key: "SubMenu",
    icon: <UserOutlined />,
    children: [
      (email && role === "subscriber") && {
        label: <Link to="/user/history">Dashboard</Link>,
        key: "dashboard",
      },
      (email && role === "admin") && {
        label: <Link to="/admin/dashboard">Dashboard</Link>,
        key: "admindashboard",
      },
      {
        label: "Logout",
        key: "logout",
        icon: <LogoutOutlined />,
        onClick: logoutUser,
      },
    ],
  };

  return (
    <div className="d-flex justify-content-between align-items-center px-3">
 
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={mainMenuItems}
        style={{ flex: 1 }}
      />

      
      <div style={{ paddingLeft: "1rem" }}>
        <Search />
      </div>

      
      {email && (
        <Menu
          mode="horizontal"
          items={[userMenuItem]}
          onClick={handleClick}
          selectedKeys={[current]}
        />
      )}
    </div>
  );
};

export default Header;
