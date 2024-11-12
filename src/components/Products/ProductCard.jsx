import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrentFormat/CurrentFormat";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function ProductCard({ product, showAddToCartButton = true }) {
  const { dispatch } = useCart();
  const { image, rating = {}, price, id, title } = product;

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

        {/* Show Rating only if the product has a rating */}
        {rating?.rate > 0 && (
          <div className={styles.rating}>
            <Rating value={rating.rate || 0} precision={0.1} readOnly />
            <small>{rating.count || 0} reviews</small>
          </div>
        )}

        {/* Price */}
        <div className={styles.price}>
          <CurrencyFormat
            amount={price}
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </div>

        {/* Add to Cart button */}
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
