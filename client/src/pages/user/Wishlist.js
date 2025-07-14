import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then(() => {
      loadWishlist();
    });

  return (
    <div className="wishlist-container">
      <style>{`
        .wishlist-container {
          padding: 25px;
          font-family: 'Segoe UI', sans-serif;
          background-color: #f4f6f9;
          min-height: 100vh;
        }
        .layout {
          display: flex;
        }
        .sidebar {
          width: 220px;
          margin-right: 25px;
        }
        .wishlist-content {
          flex: 1;
          background: #fff;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        }
        .wishlist-header {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 25px;
          color: #333;
          text-align: center;
        }
        .wishlist-card {
          background: #f9f9f9;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          padding: 18px 22px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: box-shadow 0.2s ease;
        }
        .wishlist-card:hover {
          box-shadow: 0 4px 14px rgba(0,0,0,0.06);
        }
        .wishlist-link {
          font-size: 16px;
          font-weight: 500;
          color: #007bff;
          text-decoration: none;
        }
        .wishlist-link:hover {
          text-decoration: underline;
        }
        .delete-btn {
          background: none;
          border: none;
          cursor: pointer;
        }
        .delete-btn .text-danger {
          font-size: 18px;
          transition: transform 0.2s;
        }
        .delete-btn:hover .text-danger {
          transform: scale(1.2);
        }
      `}</style>

      <div className="layout">
        <div className="sidebar">
          <UserNav />
        </div>
        <div className="wishlist-content">
          <div className="wishlist-header">Your Wishlist</div>
          {wishlist.length === 0 ? (
            <p style={{ textAlign: "center", color: "#999" }}>
              Your wishlist is empty.
            </p>
          ) : (
            wishlist.map((p) => (
              <div key={p._id} className="wishlist-card">
                <Link to={`/product/${p.slug}`} className="wishlist-link">
                  {p.title}
                </Link>
                <button
                  onClick={() => handleRemove(p._id)}
                  className="delete-btn"
                  title="Remove"
                >
                  <DeleteOutlined className="text-danger" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
