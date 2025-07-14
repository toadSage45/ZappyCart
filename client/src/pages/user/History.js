import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import Invoice from "../../components/order/Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showOrderInTable = (order) => (
    <div className="order-table">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            {/* <th>Brand</th> */}
            <th>Color</th>
            <th>Count</th>
            <th>Shipping</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td><b>{p.product.title}</b></td>
              <td>{p.product.price}</td>
              {/* <td>{p.product.brand}</td> */}
              <td>{p.product.color}</td>
              <td>{p.count}</td>
              <td>
                {p.product.shipping === "Yes" ? (
                  <CheckCircleOutlined className="icon-success" />
                ) : (
                  <CloseCircleOutlined className="icon-fail" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const showDownloadLink = (order) => (
    <div className="pdf-download-wrapper">
      <PDFDownloadLink
        document={<Invoice order={order} />}
        fileName="invoice.pdf"
        className="pdf-download-button"
      >
        {({ loading }) =>
          loading ? "Preparing PDF..." : "📄 Download Invoice"
        }
      </PDFDownloadLink>
    </div>
  );
  
  const showEachOrders = () =>
    [...orders].reverse().map((order, i) => (
      <div key={i} className="order-card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="col">{showDownloadLink(order)}</div>
      </div>
    ));

  return (
    <div className="history-container">
      <style>{`
  .history-container {
    padding: 30px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f2f4f7;
    min-height: 100vh;
  }
  .layout {
    display: flex;
  }
  .sidebar {
    width: 200px;
    margin-right: 20px;
  }
  .content {
    flex: 1;
    background: #ffffff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.08);
  }
  .header {
    text-align: center;
    margin-bottom: 35px;
    font-size: 26px;
    color: #2c3e50;
    font-weight: 600;
  }
  .order-card {
    background-color: #fefefe;
    border: 1px solid #e1e1e1;
    margin-bottom: 35px;
    padding: 25px;
    border-radius: 12px;
    transition: all 0.3s ease;
  }
  .order-card:hover {
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  }
  .order-table table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  .order-table th,
  .order-table td {
    border: 1px solid #ccc;
    padding: 12px 15px;
    text-align: center;
  }
  .order-table th {
    background-color: #f0f4f8;
    font-weight: 600;
    color: #333;
  }
  .icon-success {
    color: #28a745;
    font-size: 18px;
  }
  .icon-fail {
    color: #dc3545;
    font-size: 18px;
  }
  .pdf-download-button {
          display: inline-block;
          margin-top: 25px;
          padding: 10px 18px;
          background: linear-gradient(to right, #007bff, #0056b3);
          color: white;
          font-weight: 600;
          font-size: 14px;
          border-radius: 8px;
          text-align: center;
          transition: background 0.3s ease, transform 0.2s ease;
          text-decoration: none;
        }
        .pdf-download-button:hover {
          background: linear-gradient(to right, #0056b3, #003f7f);
          transform: translateY(-2px);
          text-decoration: none;
        }
          .pdf-download-wrapper {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }
`}</style>


      <div className="layout">
        <div className="sidebar">
          <UserNav />
        </div>
        <div className="content">
          <div className="header">
            {orders.length > 0 ? "User Purchase Orders" : "No Purchase Orders"}
          </div>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
