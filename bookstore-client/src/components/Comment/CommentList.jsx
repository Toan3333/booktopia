import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ commentDetailData, handleDeleteComment }) => {
  return (
    <div>
      <div className="grid  gap-2">
        <CommentItem handleDeleteComment={handleDeleteComment} dataComent={commentDetailData} />
      </div>
    </div>
  );
};

export default CommentList;
