import React from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../Layout/Layout";

function PaymentSuccess() {
  const location = useLocation();
  const { orderId, totalAmount } = location.state || {}; // Pass data through route state

  return (
    <Layout>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>🎉 Payment Successful! 🎉</h1>
        <p>
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>
        {orderId && (
          <p>
            Order ID: <strong>{orderId}</strong>
          </p>
        )}{" "}
        {/* Display order ID if available */}
        {totalAmount && (
          <p>
            Total Charged: <strong>${totalAmount.toFixed(2)}</strong>
          </p>
        )}
        <Link to="/orders" style={{ textDecoration: "none", color: "#1e90ff" }}>
          View Your Orders
        </Link>
        <br />
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#1e90ff",
            marginTop: "20px",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </Layout>
  );
}

export default PaymentSuccess;
