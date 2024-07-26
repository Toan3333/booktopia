import React from "react";
import Title from "../../components/Title/Title";
import ProductList from "../../components/Product/ProductList";

const NewProduct = () => {
  return (
    <div className="py-10 max-lg:py-5">
      <div className="container">
        <Title>Sản phẩm mới </Title>
        <ProductList></ProductList>
      </div>
    </div>
  );
};

export default NewProduct;
