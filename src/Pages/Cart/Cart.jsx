import React from "react";
import { useCart } from "../../components/Context/CartContext";
import styles from "./Cart.module.css"; // Import the CSS module
import Rating from "@mui/material/Rating"; // For star rating
import { Link } from "react-router-dom"; // For payment link
import Layout from "../../Layout/Layout";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

function Cart() {
  const { state, dispatch } = useCart();

  // Calculate the total price
  const totalPrice = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Layout>
      <div className={styles["cart-container"]}>
        <h2>Your Cart</h2>
        {state.cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {state.cart.map((item) => (
              <div key={item.id} className={styles["cart-item"]}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />

                <div className={styles["cart-details"]}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className={styles.rating}>
                    <Rating value={item.rating.rate} precision={0.1} readOnly />
                    <small>{item.rating.count} reviews</small>
                  </div>
                  <p className={styles.price}>
                    Price:$
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className={styles["cart-controls"]}>
                  <button
                    onClick={() =>
                      dispatch({ type: "INCREASE_QUANTITY", payload: item.id })
                    }
                    className={styles.increment}
                  >
                    <IoIosArrowDropupCircle size={25}/>
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch({ type: "DECREASE_QUANTITY", payload: item.id })
                    }
                    className={styles.decrement}
                  >
                    <IoIosArrowDropdownCircle size={25}/>
                  </button>
                </div>
              </div>
            ))}
            <div className={styles["cart-total"]}>
              Total: ${totalPrice.toFixed(2)}
            </div>
            {/* Add the 'Go to Payment' button */}
            <div className={styles.paymentLink}>
              <Link to="/payment">Go to Payment</Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
