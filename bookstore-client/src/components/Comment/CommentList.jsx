import React from "react";
import CommentItem from "./CommentItem";

const CommentList = () => {
  return (
    <div>
      <div className="grid grid-rows-3 gap-2">
        <CommentItem></CommentItem>
        <CommentItem></CommentItem>
        <CommentItem></CommentItem>
      </div>
    </div>
  );
};

export default CommentList;
