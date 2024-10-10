import React, { useState, useEffect } from "react";
import { CatagoryImage } from "./CatagoryInfo"; // Assuming you are fetching data from here
import CatagoryCard from "./CatagoryCard";
import styles from "./CatagoryCard.module.css";
import Loader from "../../components/Loader/Loader"; // Import your Loader component

function Catagory() {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [categories, setCategories] = useState([]); // To store the category data

  useEffect(() => {
    // Simulate loading data for categories
    setTimeout(() => {
      setCategories(CatagoryImage); // Simulating fetching category data
      setIsLoading(false); // Set loading to false when data is loaded
    }, 2000); // Simulate 2-second loading delay
  }, []);

  return (
    <section className={styles["catagory-section"]}>
      {/* Show Loader while loading */}
      {isLoading ? (
        <Loader />
      ) : (
        categories.map((infos, index) => (
          <CatagoryCard key={index} data={infos} />
        ))
      )}
    </section>
  );
}

export default Catagory;
