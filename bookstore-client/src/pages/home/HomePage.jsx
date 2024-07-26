import React from "react";
import Banner from "./Banner";
import NewProduct from "./NewProduct";
import SellingProduct from "./SellingProduct";
import ProductForYou from "./ProductForYou";
import Blog from "./Blog";

import Service from "./Service";
import FlashSale from "./FlashSale";
import ViewProduct from "./ViewProduct";

const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <NewProduct></NewProduct>
      <FlashSale></FlashSale>
      <SellingProduct></SellingProduct>
      <ViewProduct></ViewProduct>
      <ProductForYou></ProductForYou>
      <Blog></Blog>
      <Service></Service>
    </div>
  );
};

export default HomePage;
