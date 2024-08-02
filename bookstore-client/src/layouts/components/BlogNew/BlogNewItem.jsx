import React from "react";

const BlogNewItem = ({item}) => {
const {name, date, content,image}=item;
  return (
    <div>
      <div className="rounded-[30px] border p-4">
        <div className="flex items-center gap-3">
          <div className="w-[60px] h-[60px]">
<<<<<<< HEAD
            <img src="./images/image 100.png" className="w-full h-full" alt="" />
          </div>
          <div className="flex w-full flex-col gap-1">
            <div className="text-grayText font-normal leading-normal">15/07/2024</div>
=======
            <img src={`http://localhost:3000/images/${image}`} className="w-full object-cover h-full" alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-grayText font-normal leading-normal">{date}</div>
>>>>>>> 32970d5af44a7de17f202620e08238ae66e65cb0
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
