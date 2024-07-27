import React, { useState, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const SampleNextArrow = ({ onClick }) => (
    <div
      className="custom-arrow cursor-pointer flex items-center justify-center bg-white rounded-full border-2 border-gray-300 hover:bg-mainDark hover:text-white transition-colors duration-300"
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: "50%",
        right: "20px",
        transform: "translateY(-50%)",
        zIndex: "1",
      }}
      onClick={onClick}>
      <FaAngleRight style={{ fontSize: "20px" }} />
    </div>
  );

  const SamplePrevArrow = ({ onClick }) => (
    <div
      className="custom-arrow cursor-pointer flex items-center justify-center bg-white rounded-full border-2 border-gray-300 hover:bg-mainDark hover:text-white transition-colors duration-300"
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: "50%",
        left: "20px",
        transform: "translateY(-50%)",
        zIndex: "1",
      }}
      onClick={onClick}>
      <FaAngleLeft style={{ fontSize: "20px" }} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div className="dots-container">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className="w-3 h-3 rounded-full cursor-pointer"
        style={{
          backgroundColor: i === currentSlide ? "#166534" : "#ccc",
        }}></div>
    ),
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div className="relative mt-[1px]">
      <div className="slider-container overflow-hidden pb-10">
        <Slider ref={sliderRef} {...settings}>
          <div className="w-full">
            <img
              src="./images/banner1.jpg"
              className="w-full h-[520px] cursor-pointer max-lg:h-48 max-md:h-44 max-xl:h-56 object-cover"
              alt="Banner 1"
            />
          </div>
          <div className="w-full">
            <img
              src="./images/banner2.jpg"
              className="w-full h-[520px] cursor-pointer max-lg:h-48 max-md:h-44 max-xl:h-56 object-cover"
              alt="Banner 2"
            />
          </div>
          <div className="w-full">
            <img
              src="./images/banner3.jpg"
              className="w-full h-[520px] cursor-pointer max-lg:h-48 max-md:h-44 max-xl:h-56 object-cover"
              alt="Banner 3"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
