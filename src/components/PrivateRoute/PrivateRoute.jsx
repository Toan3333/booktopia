// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const PrivateRoute = ({ children, allowedRoles }) => {
//   try {
//     const userCookie = Cookies.get("user");
//     const user = userCookie ? JSON.parse(userCookie) : null;
//     const userRole = user ? user.user.role : null; // role từ user

//     // Kiểm tra quyền truy cập
//     if (
//       (user && allowedRoles.includes(-1)) || // Chỉ cần đăng nhập
//       allowedRoles.includes(userRole) || // Role phù hợp
//       (!user && allowedRoles.includes(0)) // Không đăng nhập
//     ) {
//       return children; // Cho phép truy cập
//     }

//     // Chuyển hướng về trang đăng nhập
//     return <Navigate to="/sign-in" replace />;
//   } catch (error) {
//     console.error("Lỗi khi đọc cookie:", error);
//     return <Navigate to="/sign-in" replace />;
//   }
// };

// export default PrivateRoute;
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children, allowedRoles }) => {
  try {
    const userCookie = Cookies.get("user");
    const user = userCookie ? JSON.parse(userCookie) : null;
    const userRole = user ? user.user.role : null; // role từ user

    // Kiểm tra quyền truy cập
    if (
      (user && allowedRoles.includes(-1) && userRole !== 1) || // Đã đăng nhập nhưng không phải admin
      allowedRoles.includes(userRole) || // Role phù hợp
      (!user && allowedRoles.includes(0)) // Không đăng nhập
    ) {
      return children; // Cho phép truy cập
    }

    // Chuyển hướng về trang đăng nhập
    return <Navigate to="/sign-in" replace />;
  } catch (error) {
    console.error("Lỗi khi đọc cookie:", error);
    return <Navigate to="/sign-in" replace />;
  }
};

export default PrivateRoute;
