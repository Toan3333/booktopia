import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Title = ({ children }) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-24">
        <h2 className="text-[28px] font-bold leading-normal max-lg:text-[16px] max-xl:text-2xl">
          {children}
        </h2>
        <div className="border w-1/2 max-lg:w-2/5 max-md:hidden"></div>
        <Link to="/menu">
          <div className="text-main flex items-center gap-1 cursor-pointer font-normal">
            Xem thêm <FaAngleRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Title;
