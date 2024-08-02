import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ item }) => {
  const { name, date, image, content } = item;

  // Chuyển đổi chuỗi ngày tháng thành định dạng ngày, tháng, năm
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div>
      <div className="">
        <Link to="/blog-detail/_id" className="w-full">
          <img
            src={`http://localhost:3000/images/${image}`}
            className="w-full object-cover rounded-[30px]"
            alt=""
          />
        </Link>
        <div className="mt-2 flex flex-col gap-1">
          <p className="text-gray-400 font-light text-sm">{formattedDate}</p>
          <h3 className="font-semibold leading-normal max-md:leading-none max-md:text-sm max-md:line-clamp-2">
            <a href="#" className="cursor-pointer hover:text-mainDark max-md:text-sm line-clamp-1">
              {name}
            </a>
          </h3>
          <p className="text-text text-sm font-light leading-normal max-md:line-clamp-2 line-clamp-3">
            {content}
          </p>
          <div>
            <button className="max-md:text-sm">Xem thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
