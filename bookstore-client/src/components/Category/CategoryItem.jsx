import React from "react";

const CategoryItem = ({
  title,
  items,
  onCategoryClick,
  onAuthorClick,
  onPublishClick,
}) => {
  const handleClick = (e, id, type) => {
    e.preventDefault(); // Chặn thẻ <a>
    if (type === "category") {
      onCategoryClick(id);
    } else if (type === "author") {
      onAuthorClick(id);
    } else if (type === "publish") {
      onPublishClick(id);
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
              onClick={(e) => handleClick(e, null, title === "Tác giả" ? "author" : title === "Nhà xuất bản" ? "publish" : "category")}
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
                    title === "Tác giả"
                      ? "author"
                      : title === "Nhà xuất bản"
                      ? "publish"
                      : "category"
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
