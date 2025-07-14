import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ClockCircleOutlined, LockOutlined, HeartOutlined } from '@ant-design/icons';

const UserNav = () => {
   const { pathname } = useLocation();

   return (
      <div className="user-nav-wrapper">
         <style>{`
        .user-nav-wrapper {
          background: #fff;
          border-radius: 12px;
          padding: 25px 20px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
          font-family: 'Segoe UI', sans-serif;
        }

        .user-nav-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #333;
          text-align: center;
        }

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-item {
          margin-bottom: 15px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background-color: #f5f7fa;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          color: #444;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .nav-link:hover {
          background-color: #e8f0fe;
          color: #1a73e8;
          transform: translateX(4px);
        }

        .nav-link.active {
          background-color: #dbeafe;
          color: #1a56db;
          font-weight: 600;
        }
      `}</style>

         <div className="user-nav-title">User Dashboard</div>

         <ul className="nav-list">
            <li className="nav-item">
               <Link
                  to="/user/history"
                  className={`nav-link ${pathname === '/user/history' ? 'active' : ''}`}
               >
                  <ClockCircleOutlined />
                  Order History
               </Link>
            </li>
            <li className="nav-item">
               <Link
                  to="/user/password"
                  className={`nav-link ${pathname === '/user/password' ? 'active' : ''}`}
               >
                  <LockOutlined />
                  Change Password
               </Link>
            </li>
            <li className="nav-item">
               <Link
                  to="/user/wishlist"
                  className={`nav-link ${pathname === '/user/wishlist' ? 'active' : ''}`}
               >
                  <HeartOutlined />
                  Wishlist
               </Link>
            </li>
         </ul>
      </div>
   );
};

export default UserNav;
