import React from "react";
import Carousel from "../../components/carousel/Carousel"
import Catagory from "../../components/catagory/Catagory";
import Layout from "../../Layout/Layout";
import Product from "../../components/Products/Product";

function Landing() {
  return (
    <div>
      <Layout>
        <Carousel />
        <Catagory />
        <Product />
      </Layout>
    </div>
  );
}

export default Landing;
