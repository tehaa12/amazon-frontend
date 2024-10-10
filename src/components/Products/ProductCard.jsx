import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrentFormat/CurrentFormat";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext"; // Adjust the path as necessary

function ProductCard({ product, showAddToCartButton = true }) {
  // Add the prop here
  const { dispatch } = useCart();
  const { image, rating, price, id, title } = product;

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className={styles.card}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={styles.image} />
      </Link>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.rating}>
          <Rating value={rating.rate} precision={0.1} readOnly />
          <small>{rating.count} reviews</small>
        </div>
        <div className={styles.price}>
          <CurrencyFormat
            amount={price}
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </div>

        {/* Only show the "Add to Cart" button if the prop is true */}
        {showAddToCartButton && (
          <button className={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
