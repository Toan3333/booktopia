import React from "react";
import { FaRegBell, FaSearch } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
const HeaderAdmin = () => {
  return (
    <div className="my-3">
      <div className="bg-mainDark rounded-[10px] p-5">
        <div className="flex items-center justify-between">
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow placeholder:text-grayText"
                placeholder="Tìm kiếm..."
              />
              <FaSearch className="text-grayText" />
            </label>
          </div>
          <div className="flex items-center gap-5 text-white">
            <FaRegBell className="w-5 h-5"></FaRegBell>
            <IoChatbubbleEllipsesOutline className="w-5 h-5"></IoChatbubbleEllipsesOutline>
            <div>
              <img src="./images/avatar.png" className="w-10 h-10 rounded-full" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
