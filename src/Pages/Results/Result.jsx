import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductUrl } from "../../Api/End";
import ProductCard from "../../components/Products/ProductCard";
import styles from "./Result.module.css"; // Import CSS module
import Loader from "../../components/Loader/Loader"; // Import Loader component

function Result() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true); // Set loading to true when the component mounts
    axios
      .get(`${ProductUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false); // Stop loading when data is fetched
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Stop loading on error
      });
  }, [categoryName]);

  return (
    <Layout>
      <section className={styles.section}>
        <h1 className={styles.heading}>Results</h1>
        <p className={styles.categoryPath}>category / {categoryName}</p>
        <hr />

        {/* Show Loader if still loading */}
        {isLoading ? (
          <Loader /> // Display the spinner while data is being fetched
        ) : (
          <div className={styles.grid}>
            {results?.map((product) => (
              <div className={styles.productCard} key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Result;
