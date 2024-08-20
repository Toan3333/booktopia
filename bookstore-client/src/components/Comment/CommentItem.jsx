import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // cài thư viện để lấy cookie

const CommentItem = ({ dataComent, handleDeleteComment }) => {
  const [inforUser, setInforUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      setInforUser(userData?.user);
    } else {
      console.log("User not found in cookie");
    }
  }, []);

  return (
    <div className="mt-10">
      <div className="container">
        {dataComent && dataComent.length > 0 ? (
          dataComent.map((comment) => (
            <div key={comment._id} className="flex items-center gap-4 mb-2 justify-between">
              <div className="w-[90%]">
                <div>
                  <img
                    src={
                      comment?.user?.image
                        ? `http://localhost:3000/images/${comment.user.image}`
                        : "./images/avatar.png"
                    }
                    className="w-16 h-16 rounded-full"
                    alt={comment?.user?.name || "User Avatar"}
                  />
                </div>
                <div className="border rounded-[10px] py-4 px-5 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="text-grayText font-normal leading-normal">
                      {new Date(comment?.day).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <h3 className="text-[18px] text-text font-semibold leading-normal">
                      {comment?.user?.name}
                    </h3>
                    <p className="text-text font-normal leading-normal">{comment?.content}</p>
                  </div>
                </div>
              </div>
              {comment?.user?._id === inforUser?._id ? (
                <div className="cursor-pointer">
                  <span
                    className="text-[#fff] bg-red rounded-[5px] p-2"
                    onClick={() => handleDeleteComment(comment?._id)}>
                    xóa
                  </span>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <h1>Không có bình luận</h1>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
