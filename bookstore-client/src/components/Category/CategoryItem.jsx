import React from "react";

const CategoryItem = ({ title, items, onCategoryClick, onAuthorClick, onPublishClick }) => {
  const handleClick = (e, id, name, type) => {
    e.preventDefault(); // Chặn hành vi mặc định của thẻ <a>
    if (type === "category") {
      onCategoryClick(id, name);
    } else if (type === "author") {
      onAuthorClick(id, name);
    } else if (type === "publish") {
      onPublishClick(id, name);
    }
  };

  return (
    <div>
      {title && (
        <h3 className="text-mainDark text-price font-semibold leading-normal mb-7">
          {title}
        </h3>
      )}
      {items && items.length > 0 && (
        <ul className="flex flex-col gap-7">
          <li>
            <a
              href="#"
              className="text-text leading-normal font-normal menu-link"
              onClick={(e) => handleClick(e, null, "Tất cả sản phẩm", title === "Danh mục" ? "category" : title === "Tác giả" ? "author" : "publish")}
            >
              Tất cả sản phẩm
            </a>
          </li>
          {items.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-text leading-normal font-normal menu-link"
                onClick={(e) =>
                  handleClick(
                    e,
                    item._id,
                    item.name,
                    title === "Danh mục" ? "category" : title === "Tác giả" ? "author" : "publish"
                  )
                }
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryItem;
