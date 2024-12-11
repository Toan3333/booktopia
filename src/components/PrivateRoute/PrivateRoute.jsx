import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children, allowedRoles }) => {
  try {
    const userCookie = Cookies.get("user");
    const user = userCookie ? JSON.parse(userCookie) : null;
    const userRole = user ? user.user.role : null; // role từ user

    if (
      (user && allowedRoles.includes(-1) && userRole !== 1) || // Đã đăng nhập nhưng không phải admin
      allowedRoles.includes(userRole) ||
      (!user && allowedRoles.includes(0))
    ) {
      return children;
    }

    // Chuyển hướng về trang đăng nhập
    return <Navigate to="/sign-in" replace />;
  } catch (error) {
    console.error("Lỗi khi đọc cookie:", error);
    return <Navigate to="/sign-in" replace />;
  }
};

export default PrivateRoute;
