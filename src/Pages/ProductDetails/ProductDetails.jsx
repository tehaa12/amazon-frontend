import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductUrl } from "../../Api/End";
import styles from "./ProductDetails.module.css";
import Loader from "../../components/Loader/Loader";
import { useCart } from "../../components/Context/CartContext"; // Import useCart

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Corrected to camelCase
  const { dispatch } = useCart(); // Destructure dispatch from useCart

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${ProductUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]);

  // Function to handle Add to Cart
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        description: product.description,
        rating: product.rating, // If available
      },
    });
  };

  return (
    <Layout>
      {isLoading ? (
        <Loader /> // Correct Loader call
      ) : (
        product && ( // Ensure product exists before rendering details
          <div className={styles.productDetailsContainer}>
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />

            {/* Product Information */}
            <div className={styles.productInfo}>
              <h1 className={styles.productTitle}>{product.title}</h1>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>${product.price}</p>
              <button
                className={styles.addToCartButton}
                onClick={handleAddToCart} // Add onClick handler
              >
                Add to Cart
              </button>
            </div>
          </div>
        )
      )}
    </Layout>
  );
}

export default ProductDetails;
