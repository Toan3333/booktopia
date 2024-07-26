import React from "react";

const BlogNewItem = () => {
  return (
    <div>
      <div className="rounded-[30px] border p-4">
        <div className="flex items-center gap-3">
          <div className="w-[100px] h-[100px]">
            <img src="./images/image 100.png" className="w-full h-full" alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-grayText font-normal leading-normal">15/07/2024</div>
            <h3 className="text-text font-medium leading-normal">
              Bí Quyết Giao Tiếp Hiệu Quả: 'Đắc Nhân Tâm'
            </h3>
            <div className="text-grayText font-normal leading-normal">Dale Carnegie</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogNewItem;
