import React from "react";
import Title from "../../components/Title/Title";
import ProductList from "../../components/Product/ProductList";

const ViewProduct = () => {
  return (
    <div>
      <div className="container">
        <Title>Nhiều lượt xem</Title>
        <div className="flex items-center justify-between gap-8 py-10 max-lg:flex-col max-lg:gap-5 max-lg:py-5">
          <div className="w-3/5 max-lg:w-full max-md:hidden">
            <img
              src="./images/view.png"
              className="w-full h-[580px] object-cover rounded-2xl max-lg:h-[380px] max-lg:w-full"
              alt=""
            />
          </div>
          <div className="w-2/5 max-lg:w-full">
            <ProductList customColItem={true} type="view"></ProductList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
