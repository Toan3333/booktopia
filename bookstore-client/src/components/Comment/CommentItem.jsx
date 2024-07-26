import React from "react";

const CommentItem = () => {
  return (
    <div className="mt-10">
      <div className="container">
        <div className="flex items-center gap-4">
          <div>
            <img src="./images/avatar.png" className="w-16 h-16 rounded-full" alt="" />
          </div>
          <div className="border rounded-[10px] py-4 px-5 w-full">
            <div className="flex flex-col gap-2">
              <div className="text-grayText font-normal leading-normal">17/07/2024</div>
              <h3 className="text-[18px] text-text font-semibold leading-normal">
                trinh tran phuong tuan
              </h3>
              <p className="text-text font-normal leading-normal">
                sách hay lắm, tôi sẽ mua cho con tôi đọc
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
