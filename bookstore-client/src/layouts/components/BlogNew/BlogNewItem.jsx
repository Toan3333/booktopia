import React from "react";

const BlogNewItem = ({item}) => {
const {name, date, content,image}=item;
  return (
    <div>
      <div className="rounded-[30px] border p-4">
        <div className="flex items-center gap-3">
          <div className="w-[60px] h-[60px]">
            <img src={`http://localhost:3000/images/${image}`} className="w-full object-cover h-full" alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-grayText font-normal leading-normal">{date}</div>
            <h3 className="text-text font-medium leading-normal">
              {name}
            </h3>
            <div className="text-grayText line-clamp-3 font-normal leading-normal">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogNewItem;
