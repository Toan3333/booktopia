import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { URL_API } from "../../constants/constants";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const defaultAvatar =
    "https://images.unsplash.com/photo-1686170287433-c95faf6d3608?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3t8fHx8fHw%3D";

  useEffect(() => {
    // Lấy dữ liệu người dùng từ cookie
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser.user); // Giả sử `parsedUser.user.userUpdate` chứa thông tin người dùng
    }
  }, []);

  const handleLogout = () => {
    // Xử lý logout, ví dụ xóa cookie và chuyển hướng người dùng
    Cookies.remove("user");
    // Chuyển hướng hoặc cập nhật state để hiển thị UI phù hợp
    navigate("/sign-in");
  };

  return (
    <div className="drawer-end z-50">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Nút avatar để mở sidebar */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-circle btn-ghost avatar">
          <div className="w-20 rounded-full">
            {user?.image ? (
              <img alt="User avatar" src={`${URL_API}/images/${user?.image}`} />
            ) : (
              <img alt="Default avatar" src={defaultAvatar} />
            )}
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          {user?.role === "admin" && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
