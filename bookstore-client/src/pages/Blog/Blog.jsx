import React, { useRef } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import BlogNewList from "../../layouts/components/BlogNew/BlogNewList";
import BlogList from "../../components/Blog/BlogList";

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

  return (
    <div className="py-10 max-lg:py-5 max-md:py-2">
      <div className="container">
        <PageTitle title="Bài viết" className="text-center mb-5" />
        <div className="flex justify-between">
          <div className="max-w-[900px] w-full">
            <div className="relative rounded-[30px] border py-14 px-20">
              <Slider ref={sliderRef} {...settings}>
                <div>
                  <img
                    src="./images/blog.png"
                    alt="Blog-img"
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="flex flex-col mt-3">
                    <div className="text-gray-500 font-normal leading-normal">15/07/2024</div>
                    <h3 className="text-lg font-semibold text-text">Lợi ích của việc đọc sách</h3>
                    <p className="text-sm font-normal leading-normal text-gray-500">
                      Đọc sách mang đến nhiều lợi ích bất ngờ mà bạn không hề biết đến. Đọc sách
                      đúng cách giúp kích thích não bộ phát triển tốt hơn, hạn chế lão hóa và giảm
                      khả năng mất trí nhớ. Ngoài ra, đọc sách cũng giúp con người ta nâng cao hiểu
                      biết, làm giàu vốn từ, tăng khả năng tư duy, nhìn nhận vấn đề…
                    </p>
                    <div className="text-right text-sm font-normal text-gray-500 cursor-pointer">
                      Đọc thêm
                    </div>
                  </div>
                </div>
                {/* Thêm các slide khác ở đây */}
                <div>
                  <img
                    src="./images/blog.png"
                    alt="Blog-img"
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="flex flex-col mt-3">
                    <div className="text-gray-500 font-normal leading-normal">17/07/2024</div>
                    <h3 className="text-lg font-semibold text-text">
                      Lợi ích của việc tập thể dục
                    </h3>
                    <p className="text-sm font-normal leading-normal text-gray-500">
                      Tập thể dục đều đặn mang lại nhiều lợi ích cho sức khỏe, từ việc cải thiện sự
                      trao đổi chất, tăng cường sức đề kháng, đến việc nâng cao tinh thần và giảm
                      căng thẳng. Đây là một thói quen quan trọng giúp duy trì cơ thể khỏe mạnh và
                      tinh thần vui vẻ.
                    </p>
                    <div className="text-right text-sm font-normal text-gray-500 cursor-pointer">
                      Đọc thêm
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    src="./images/blog.png"
                    alt="Blog-img"
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="flex flex-col mt-3">
                    <div className="text-gray-500 font-normal leading-normal">17/07/2024</div>
                    <h3 className="text-lg font-semibold text-text">
                      Lợi ích của việc tập thể dục
                    </h3>
                    <p className="text-sm font-normal leading-normal text-gray-500">
                      Tập thể dục đều đặn mang lại nhiều lợi ích cho sức khỏe, từ việc cải thiện sự
                      trao đổi chất, tăng cường sức đề kháng, đến việc nâng cao tinh thần và giảm
                      căng thẳng. Đây là một thói quen quan trọng giúp duy trì cơ thể khỏe mạnh và
                      tinh thần vui vẻ.
                    </p>
                    <div className="text-right text-sm font-normal text-gray-500 cursor-pointer">
                      Đọc thêm
                    </div>
                  </div>
                </div>
                {/* Thêm các slide khác nếu cần */}
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
