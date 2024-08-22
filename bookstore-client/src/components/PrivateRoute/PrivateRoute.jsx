import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  // Đọc dữ liệu người dùng từ cookie
  const userCookie = Cookies.get("user");
  console.log("User cookie:", userCookie); // Kiểm tra giá trị cookie

  // Chuyển đổi từ JSON string sang object
  const user = userCookie ? JSON.parse(userCookie) : null;
  console.log("Parsed user:", user); // Kiểm tra đối tượng người dùng

  // Kiểm tra nếu user không tồn tại hoặc không phải là admin
  if (!user || user.role !== 1) {
    console.log("User is not admin or not logged in, redirecting to /sign-in");
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default PrivateRoute;
