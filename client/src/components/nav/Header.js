import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { logout } from "../../features/user/userSlice";

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

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    !email && {

      label: <Link to="/register">Register</Link>,
      key: "register",
      icon: <UserAddOutlined />,
      className: "float-right"
    },
    !email && {
      label: <Link to="/login">Login</Link>,
      key: "login",
      icon: <LoginOutlined />,
      className: "float-right"
    },
    email && {
      label: `${email.split('@')[0]}`,
      key: "SubMenu",
      icon: <UserOutlined />,
      className: "float-right",
      children: [
        (email && role === "subscriber") &&

        {
          label: <Link to="/user/history">Dashboard</Link>,
          key: "dashboard",
        },

        (email && role === "admin") &&

        {
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
    },
  ];

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
