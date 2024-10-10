import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../components/Context/firebase";
import Layout from "../../Layout/Layout";
import ProductCard from "../../components/Products/ProductCard"; // Import ProductCard
import styles from "./Order.module.css";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid));

        try {
          const querySnapshot = await getDocs(q);
          const fetchedOrders = [];

          querySnapshot.forEach((doc) => {
            fetchedOrders.push({ id: doc.id, ...doc.data() });
          });

          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Error fetching orders: ", error);
          setError("Failed to load orders.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("You must be logged in to view your orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className={styles["order-container"]}>
        <h1>Your Orders</h1>

        {loading && <p>Loading orders...</p>}
        {error && <p className={styles["order-error"]}>{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p>You have no orders yet.</p>
        )}

        {/* Loop through orders and display each order's products */}
        {!loading &&
          !error &&
          orders.length > 0 &&
          orders.map((order) => (
            <div key={order.id} className={styles.order}>
              <h2>Order ID: {order.id}</h2>
              <p>
                <strong>Total Amount:</strong> $
                {order.amount ? order.amount.toFixed(2) : "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              {/* Optionally display order date */}
              {order.createdDate?.seconds && (
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(
                    order.createdDate.seconds * 1000
                  ).toLocaleDateString()}
                </p>
              )}

              <div className={styles["order-products"]}>
                {Array.isArray(order.items) &&
                  order.items.map((item) => (
                    <ProductCard
                      key={item.id}
                      product={item}
                      showAddToCartButton={false} // Hide "Add to Cart" button
                    />
                  ))}
              </div>
              <hr className={styles["order-hr"]} />
            </div>
          ))}
      </div>
    </Layout>
  );
}

export default Order;
