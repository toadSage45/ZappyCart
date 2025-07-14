import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  const {
    paymentIntent: {
      id,
      amount,
      currency,
      status,
      payment_method_types,
      created,
    },
    orderStatus,
  } = order;

  const formattedDate = new Date(created * 1000).toLocaleString();

  return (
    <div className="payment-info-box">
      <style>{`
                .payment-info-box {
                  padding: 20px;
                  background: linear-gradient(135deg, #f9fcff, #eef5ff);
                  border: 1px solid #dce6f1;
                  border-radius: 10px;
                  margin-bottom: 20px;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                  font-family: 'Segoe UI', sans-serif;
                }
                .info-row {
                  display: flex;
                  margin-bottom: 10px;
                }
                .info-label {
                  width: 180px;
                  font-weight: 600;
                  color: #555;
                }
                .info-value {
                  color: #111;
                }
                .status {
                  padding: 5px 12px;
                  border-radius: 20px;
                  font-size: 13px;
                  font-weight: bold;
                  text-transform: capitalize;
                }
                .succeeded {
                  background-color: #d4edda;
                  color: #155724;
                }
                .failed {
                  background-color: #f8d7da;
                  color: #721c24;
                }
                .pending {
                  background-color: #fff3cd;
                  color: #856404;
                }
                .processing {
                  background-color: #d1ecf1;
                  color: #0c5460;
                }
            `}</style>

      <div className="info-row">
        <div className="info-label">Payment ID:</div>
        <div className="info-value">{id}</div>
      </div>
      <div className="info-row">
        <div className="info-label">Amount:</div>
        <div className="info-value">
          {(amount / 100).toLocaleString("en-IN", {
            style: "currency",
            currency,
          })}
        </div>
      </div>
      <div className="info-row">
        <div className="info-label">Currency:</div>
        <div className="info-value">{currency.toUpperCase()}</div>
      </div>
      <div className="info-row">
        <div className="info-label">Method:</div>
        <div className="info-value" style={{ textTransform: "capitalize" }}>
          {payment_method_types?.[0]}
        </div>
      </div>
      <div className="info-row">
        <div className="info-label">Payment Date:</div>
        <div className="info-value">{formattedDate}</div>
      </div>
      <div className="info-row">
        <div className="info-label">Payment Status:</div>
        <div className="info-value">
          <span className={`status ${status}`}>{status}</span>
        </div>
      </div>
      {showStatus && (
        <div className="info-row">
          <div className="info-label">Order Status:</div>
          <div className="info-value">
            <span className="status processing">{orderStatus}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowPaymentInfo;
