import React from "react";
import BlogItem from "./BlogItem";

const BlogList = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-5 py-10 max-lg:grid-cols-2">
        <BlogItem></BlogItem>
        <BlogItem></BlogItem>
        <BlogItem></BlogItem>
        <BlogItem></BlogItem>
      </div>
    </div>
  );
};

export default BlogList;
