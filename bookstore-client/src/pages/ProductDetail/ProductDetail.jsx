import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { CiHeart } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import "../../index.css";
import CommentList from "../../components/Comment/CommentList";
import Title from "../../components/Title/Title";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductItem from "../../components/Product/ProductItem";

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("info");
  const { id } = useParams();
  const [productDetailData, setProductDetailData] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProductDetailData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetail();
  }, [id]);

  if (!productDetailData) {
    return <div>Loading...</div>;
  }

  const {
    name,
    image1,
    image2,
    image3,
    image4,
    price1,
    price2,
    sale,
    description,
    quantity,
    publish,
    author,
    category,
  } = productDetailData;

  return (
    <div className="py-10">
      <div className="container">
        <nav>
          <a href="#" className="text-gray-500">
            Sản phẩm
          </a>
          <span className="text-gray-500"> / </span>
          <a href="#" className="text-mainDark font-semibold leading-normal">
            {name}
          </a>
        </nav>
        <div className="flex justify-between py-10 max-md:flex-col">
          <div className="w-[65%] max-xl:w-3/5 max-md:w-full">
            <div className="flex gap-2 items-center">
              <div className="max-w-[130px] w-full max-xl:hidden">
                <div className="flex flex-col gap-10">
                  {[image1, image2, image3, image4].map((img, index) =>
                    img ? (
                      <div key={index} className="w-full">
                        <img
                          src={`http://localhost:3000/images/${img}`}
                          alt={`product-detail-img-${index}`}
                          className="w-full h-[120px]"
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </div>
              {image1 && (
                <div className="w-full">
                  <img
                    src={`http://localhost:3000/images/${image1}`}
                    alt="product-detail-img-main"
                    className="w-full h-[500px] object-cover max-md:h-[400px]"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-[45%] max-md:w-full">
            <PageTitle title={name} className="mb-5 leading-9 max-xl:text-xl" />
            <div className="flex items-center gap-8 max-md:gap-2">
              <div className="text-red">{price1}</div>
              <div className="flex items-center gap-10">
                <div className="line-through">{price2}</div>
                <div className="w-[1px] h-4 bg-text"></div>
                <div className="text-gray-500">{sale} Đã bán</div>
              </div>
            </div>
            <div className="flex justify-between mt-8 gap-5 max-md:hidden">
              <div className="w-full flex flex-col gap-3 text-text">
                <div>
                  Tác giả: <span className="text-mainDark leading-normal">{author.authorName}</span>
                </div>
                <div>
                  Nhà xuất bản:{" "}
                  <span className="text-mainDark leading-normal">{publish.publishName}</span>
                </div>
                <div>
                  Danh mục:{" "}
                  <span className="text-mainDark leading-normal">{category.categoryName}</span>
                </div>
                <div>Kho: {quantity}</div>
              </div>
              <div className="w-full flex flex-col gap-6">
                <div>Năm xuất bản: 2023</div>
                <div>Ngôn ngữ: Tiếng Việt</div>
                <div>Số trang: 280</div>
                <div>Hình thức: Bìa mềm</div>
              </div>
            </div>
            <div className="mt-10 text-text font-normal">Số lượng :</div>
            <div className="flex items-center mt-5">
              <div className="py-2 px-5 flex items-center border border-gray-300 rounded-xl">
                <button className="px-3 py-1">
                  <FaMinus />
                </button>
                <input
                  type="text"
                  className="quantity-input w-12 text-center border-0 focus:ring-0"
                  defaultValue="1"
                />
                <button className="px-3 py-1">
                  <FaPlus />
                </button>
              </div>
              <div className="flex items-center gap-2 ml-4 text-text font-normal">
                <CiHeart className="w-8 h-8 cursor-pointer" />
                Yêu thích
              </div>
            </div>
            <div className="flex flex-col gap-5 mt-10">
              <Button children="Mua ngay" className="rounded-md w-full" />
              <Button className="rounded-md button-add w-full bg-white flex items-center justify-center gap-2">
                <HiOutlineShoppingBag />
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <h3
            className={`text-[18px] font-semibold cursor-pointer ${
              activeTab === "info" ? "text-text" : "text-grayText"
            }`}
            onClick={() => setActiveTab("info")}>
            Thông tin sản phẩm
          </h3>
          <h3
            className={`text-[18px] font-semibold cursor-pointer ${
              activeTab === "comments" ? "text-text" : "text-grayText"
            }`}
            onClick={() => setActiveTab("comments")}>
            Bình luận (3)
          </h3>
        </div>
        {activeTab === "info" && (
          <div className="mt-7">
            <p className="text-text font-normal leading-normal">{description}</p>
          </div>
        )}
        {activeTab === "comments" && (
          <div className="mt-7">
            <PageTitle title="3 lượt bình luận" />
            <form action="" className="mt-7">
              <div className="flex justify-between items-center">
                <div className="w-[85%]">
                  <input
                    type="text"
                    placeholder="Hãy bình luận gì đó ...."
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <Button children="Bình luận" />
                </div>
              </div>
            </form>
            <CommentList />
          </div>
        )}
        <ProductRelated id={id}></ProductRelated>
      </div>
    </div>
  );
};

const ProductRelated = ({ id }) => {
  const [productListRelated, setProductListRelated] = useState(null);
  useEffect(() => {
    const fetchProductListRelated = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/related/${id}/related`);
        const data = response.data;
        setProductListRelated(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductListRelated();
  }, [id]);
  return (
    <div>
      <div className="container">
        <div className="mt-10">
          <Title children="Sản phẩm liên quan" />
          <div className="grid grid-cols-5 max-lg:grid-cols-2">
            {productListRelated &&
              productListRelated.map((item) => (
                <ProductItem item={item} key={item._id}></ProductItem>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
