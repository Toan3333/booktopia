import React from "react";
import BlogNewItem from "./BlogNewItem";

const BlogNewList = () => {
  return (
    <div className="mt-5">
      <div className="grid grid-rows-4 gap-5">
        <BlogNewItem></BlogNewItem>
        <BlogNewItem></BlogNewItem>
        <BlogNewItem></BlogNewItem>
      </div>
    </div>
  );
};

export default BlogNewList;
