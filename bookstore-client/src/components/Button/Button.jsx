import React from "react";

const Button = ({ children, className = "", type = "submit" }) => {
  return (
    <div>
      <button
        className={`rounded-[10px] text-white font-semibold bg-mainDark py-3 px-11 ${className}`}
        type={type}>
        {children}
      </button>
    </div>
  );
};

export default Button;
