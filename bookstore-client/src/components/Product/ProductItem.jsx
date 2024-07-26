import React from "react";
import { FaEye, FaShoppingBag } from "react-icons/fa";
import "../../index.css";
import { useNavigate } from "react-router-dom";
const ProductItem = ({ className = "", item }) => {
  if (!item) {
    return null; // Hoặc bạn có thể hiển thị một thông báo lỗi hoặc một component trống
  }
  const navigate = useNavigate();
  const isHorizontal = className.includes("horizontal");
  const { name, image1, price1, price2, author } = item;
  return (
    <div className="py-4 max-md:py-0">
      <div
        className={`p-2 cursor-pointer z-10 relative group overflow-hidden rounded-[30px] hover:shadow-lg hover:bg-white max-md:mr-0`}>
        <div
          className={`flex ${
            isHorizontal ? "flex-row justify-start max-lg:flex-col" : "flex-col"
          } items-center gap-4 text-center cursor-pointer py-6 px-3 relative max-md:py-2 max-md:px-0`}>
          <div className="w-10 h-10 rounded-full bg-yellow flex items-center justify-center text-white absolute left-0 top-0">
            20%
          </div>
          <img
            src={`http://localhost:3000/images/${image1}`}
            className={`object-contain product-image ${
              isHorizontal ? "w-[100px] h-[100px]" : "w-[190px] h-[190px] cursor-pointer"
            }`}
            onClick={() => navigate(`/product-detail/${item._id}`)}
            alt=""
          />
          <div>
            <div
              className={`md:flex-none ${
                isHorizontal
                  ? "flex-col text-left items-start"
                  : "flex-col text-center items-center"
              } gap-1`}>
              <h3 className="text-sm text-text leading-normal font-semibold cursor-pointer hover:text-mainDark max-md:text-sm line-clamp-1">
                {name}
              </h3>
              <p className="text-sm font-normal text-grayText line-clamp-1 leading-normal ">
                {author.authorName}
              </p>
              <div
                className={`flex items-center gap-3 ${
                  isHorizontal ? "justify-start" : "justify-center max-md:text-sm"
                }`}>
                <div className="text-red font-semibold leading-normal">{price2} đ</div>
                <div className="line-through text-grayText">{price1} đ</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`absolute ${
            isHorizontal
              ? " flex flex-col top-20 gap-1 right-0 transform -translate-y-1/2"
              : "bottom-32 right-0  flex flex-col items-end justify-center"
          } gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-2`}>
          <FaEye className="text-main w-10 h-10 text-2xl bg-white border bg-opacity-50 p-2 rounded-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          <FaShoppingBag className="text-main w-10 h-10 text-2xl bg-white border bg-opacity-50 p-2 rounded-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
