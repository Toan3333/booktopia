import React, { useEffect,useRef, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import BlogNewList from "../../layouts/components/BlogNew/BlogNewList";
import BlogList from "../../components/Blog/BlogList";
import axios from "axios";

const Blog = () => {
  const sliderRef = useRef(null);

  const SampleNextArrow = ({ onClick }) => (
    <div
      className="custom-arrow cursor-pointer hover:bg-blue"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        zIndex: "1",
        border: "2px solid #ccc",
        position: "absolute",
        top: "40%",
        right: "-65px", // Đặt cách bên phải
        transform: "translateY(-40%)",
      }}
      onClick={onClick}>
      <FaAngleRight style={{ color: "black", fontSize: "20px" }} />
    </div>
  );

  const SamplePrevArrow = ({ onClick }) => (
    <div
      className="custom-arrow cursor-pointer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        zIndex: "1",
        border: "2px solid #ccc",
        position: "absolute",
        top: "40%",
        left: "-65px", // Đặt cách bên trái
        transform: "translateY(-40%)",
      }}
      onClick={onClick}>
      <FaAngleLeft style={{ color: "black", fontSize: "20px" }} />
    </div>
  );

  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Để hiển thị các nút điều hướng
    nextArrow: <SampleNextArrow />, // Sử dụng nút điều hướng tùy chỉnh cho Next
    prevArrow: <SamplePrevArrow />, // Sử dụng nút điều hướng tùy chỉnh cho Prev
  };

const [getBlog,setGetBlog]=useState([])



useEffect(() => {
  const fetchBlog = async () => {
    try {
      const response = await axios.get("http://localhost:3000/blog");
      const data = response.data;
      setGetBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchBlog();
 
}, []);
  return (
    <div className="py-10 max-lg:py-5 max-md:py-2">
      <div className="container">
        <PageTitle title="Bài viết" className="text-center mb-5" />
        <div className="flex justify-between">
          <div className="max-w-[900px] w-full">
            <div className="relative rounded-[30px] border py-14 px-20">
              <Slider ref={sliderRef} {...settings}>
                

               {getBlog.map((item)=>(
                 <div key={item._id}>
                 <img
                   src={`http://localhost:3000/images/${item.image}`}
                   alt="Blog-img"
                   className="w-full h-auto rounded-lg"
                 />
                 <div className="flex flex-col mt-3">
                   <div className="text-gray-500 font-normal leading-normal">{item.date}</div>
                   <h3 className="text-lg font-semibold text-text">{item.name}</h3>
                   <p className="text-sm font-normal leading-normal text-gray-500">
                   {item.content}
                   </p>
                   <div className="text-right text-sm font-normal text-gray-500 cursor-pointer">
                     Đọc thêm
                   </div>
                 </div>
               </div>
               ))}
              </Slider>
            </div>
          </div>
          <div className="max-w-[350px] w-full">
            <h3 className="text-lg text-text font-semibold leading-normal">Bài viết mới</h3>
            <BlogNewList></BlogNewList>
          </div>
        </div>
        <div>
          <PageTitle title="Bài viết khác" className="text-center"></PageTitle>
          <BlogList></BlogList>
        </div>
      </div>
    </div>
  );
};

export default Blog;
