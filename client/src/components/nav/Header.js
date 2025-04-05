import React, { useState } from "react";
import { useDispatch } from 'react-redux';
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
    {
      label: <Link to="/register">Register</Link>,
      key: "register",
      icon: <UserAddOutlined />,
      className: "float-right"
    },
    {
      label: <Link to="/login">Login</Link>,
      key: "login",
      icon: <LoginOutlined />,
      className: "float-right"
    },
    {
      label: "Username",
      key: "SubMenu",
      icon: <UserOutlined />,
      children: [
        {
          label: "Option 1",
          key: "setting:1",
        },
        {
          label: "Option 2",
          key: "setting:2",
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
