import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  // Đọc dữ liệu người dùng từ cookie
  const userCookie = Cookies.get("user");

  // Chuyển đổi từ JSON string sang object
  const user = userCookie ? JSON.parse(userCookie) : null;

  // Kiểm tra nếu user không tồn tại hoặc không phải là admin
  if (!user || user.user.role !== 1) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default PrivateRoute;
