import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({commentDetailData,handleDeleteComment}) => {
  return (
    <div>
      <div className="grid grid-rows-3 gap-2">
        <CommentItem handleDeleteComment={handleDeleteComment} dataComent={commentDetailData} />
      </div>
    </div>
  );
};

export default CommentList;
