import React from 'react'
import styles from "./CatagoryCard.module.css";
import { Link } from 'react-router-dom';


function CatagoryCard({data}) {
  return (
    <div className={styles["catagory-card"]}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h1>{data?.title}</h1>
        </span>
        <img src={data?.imgLink} alt={data.title} />
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard
