import React from "react";
import { FaEye } from "react-icons/fa6";

const ProductViews = ({ views }) => {
  return (
    <div className="flex items-center gap-1 text-sm text-gray-500">
      <FaEye className="w-4 h-4" />
      <span>{views || 0}</span>
    </div>
  );
};

export default ProductViews;
