import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useCart } from "../../components/Context/CartContext"; // Use CartContext
import styles from "./Payment.module.css";

// Load Stripe with your public key from Vite environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);



const PaymentForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useCart(); // Access the dispatch from CartContext

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe.js hasn't loaded yet. Please refresh the page.");
      setIsLoading(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://yourfrontend.com/payment-success", // Adjust to your live site
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(`Payment failed: ${error.message}`);
        setIsLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment successful!", paymentIntent);

        // Clear the cart after successful payment
        dispatch({ type: "CLEAR_CART" });

        setIsLoading(false);
        navigate("/payment-success", {
          state: {
            orderId: paymentIntent.id,
            totalAmount: totalAmount,
          },
        });
      } else {
        setErrorMessage("Payment not completed. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error during payment confirmation: ", err);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["payment-form"]}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={styles["payment-button"]}
      >
        {isLoading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </button>
      {errorMessage && (
        <div className={styles["payment-error-message"]}>{errorMessage}</div>
      )}
    </form>
  );
};

function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const { state } = useCart();
  const { cart = [] } = state;
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ); // Calculate total price
  const amount = totalPrice * 100; // Convert to cents for Stripe

  useEffect(() => {
    // Fetch client secret from backend
    axios
      .post(
        "https://amazon-backend-1-1mf9.onrender.com/create-payment-intent", // Your live backend URL
        {
          amount: amount, // Amount in cents
          currency: "usd",
        }
      )
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
      });
  }, [amount]);

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <Layout>
      <div className={styles["payment-container"]}>
        <div className={styles["payment-header"]}>
          <h2>Checkout ({totalItemsInCart} items)</h2>
        </div>
        <hr />

        <div className={styles["checkout-items"]}>
          <h2>Review Items and Delivery</h2>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className={styles["checkout-item"]}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles["item-image"]}
                />
                <div className={styles["item-details"]}>
                  <h4>{item.title}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>
        <hr />

        <div className={styles["payment-summary"]}>
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
          {clientSecret ? (
            <Elements stripe={stripePromise} options={options}>
              <PaymentForm totalAmount={totalPrice} />
            </Elements>
          ) : (
            <div className={styles["loading-message"]}>
              Loading payment form... Please wait.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Payment;
