import React from "react";

const PageTitle = ({ title, className = "" }) => {
  return (
    <div>
      <h2
        className={`text-textTitle font-semibold leading-normal text-black ${className} max-md:text-[16px] max-md:leading-6`}>
        {title}
      </h2>
    </div>
  );
};

export default PageTitle;
