import React from "react";

const PageTitle = ({ title, className = "" }) => {
  return (
    <div>
      <p
        className={` text-black ${className} max-md:text-[10px] max-md:leading-6 max-lg:text-2xl`}>
        {title}
      </p>
    </div>
  );
};

export default PageTitle;
