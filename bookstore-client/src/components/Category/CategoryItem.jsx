import React from "react";

const CategoryItem = ({ title, items }) => {
  return (
    <div>
      {title && (
        <h3 className="text-mainDark text-price font-semibold leading-normal mb-7">{title}</h3>
      )}
      {items && items.length > 0 && (
        <ul className="flex flex-col gap-7">
          {items.map((item, index) => (
            <li key={index}>
              <a href="#" className="text-text leading-normal font-normal menu-link ">
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryItem;
