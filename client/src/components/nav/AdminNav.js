import React from "react";
import { NavLink } from "react-router-dom";
import {
   DashboardOutlined,
   AppstoreAddOutlined,
   UnorderedListOutlined,
   TagsOutlined,
   NodeIndexOutlined,
   GiftOutlined,
   LockOutlined,
} from "@ant-design/icons";

const navItems = [
   { path: "/admin/dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
   { path: "/admin/product", label: "Add Product", icon: <AppstoreAddOutlined /> },
   { path: "/admin/products", label: "Products", icon: <UnorderedListOutlined /> },
   { path: "/admin/category", label: "Category", icon: <TagsOutlined /> },
   { path: "/admin/sub", label: "Sub Category", icon: <NodeIndexOutlined /> },
   { path: "/admin/coupon", label: "Coupons", icon: <GiftOutlined /> },
   { path: "/user/password", label: "Password", icon: <LockOutlined /> },
];

const AdminNav = () => {
   return (
      <div className="card shadow-sm border-0 p-3 bg-white rounded">
         <ul className="nav flex-column">
            {navItems.map((item, index) => (
               <li className="nav-item mb-2" key={index}>
                  <NavLink
                     to={item.path}
                     className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 fw-medium ${isActive ? "text-primary" : "text-dark"
                        }`
                     }
                     style={{ fontSize: "15px" }}
                  >
                     {item.icon}
                     {item.label}
                  </NavLink>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default AdminNav;
