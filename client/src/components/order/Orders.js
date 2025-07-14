import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {
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

  return (
    <>
      <style>{`
        .order-wrapper {
          background: #ffffff;
          border-radius: 12px;
          margin-bottom: 30px;
          padding: 25px 30px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
          transition: 0.3s;
        }
        .order-wrapper:hover {
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        }
        .delivery-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 20px;
          font-family: 'Segoe UI', sans-serif;
        }
        .delivery-label {
          flex: 1;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          font-size: 16px;
        }
        .delivery-select {
          flex: 2;
          padding: 10px;
          font-size: 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          outline: none;
          background-color: #f8f9fa;
          transition: 0.2s ease-in-out;
        }
        .delivery-select:focus {
          border-color: #007bff;
          background-color: #fff;
        }
        .order-table table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .order-table th, .order-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }
        .order-table th {
          background-color: #f1f1f1;
          font-weight: bold;
        }
        .icon-success {
          color: green;
          font-size: 18px;
        }
        .icon-fail {
          color: red;
          font-size: 18px;
        }
      `}</style>

      {orders.map((order) => (
        <div key={order._id} className="order-wrapper">
          <ShowPaymentInfo order={order} showStatus={false} />

          <div className="delivery-row">
            <div className="delivery-label">Delivery Status:</div>
            <select
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="delivery-select"
              defaultValue={order.orderStatus}
              name="status"
            >
              <option value="Not Processed">Not Processed</option>
              <option value="Processing">Processing</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;
