import React from "react";
import { FaRegEdit, FaUser, FaHeart, FaCalendar } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";

const Profile = () => {
  const profileMenuList = [
    { id: 1, name: "Tài khoản của tôi", icon: <FaUser />, link: "/profile" },
    { id: 2, name: "Sản phẩm yêu thích", icon: <FaHeart />, link: "/favorites" },
    { id: 3, name: "Đơn hàng của bạn", icon: <FaCalendar />, link: "/my-orders" },
    { id: 4, name: "Đăng xuất", icon: <FiLogOut />, link: "/logout" },
  ];

  return (
    <div className="py-10">
      <div className="container">
        <div className="flex gap-10">
          <div className="max-w-[300px] w-full">
            {/* Thông tin tài khoản */}
            <div className="flex items-center gap-2">
              <img
                src="./images/avatar.png"
                className="w-[50px] h-[50px] rounded-full"
                alt="Avatar"
              />
              <div>
                <h3 className="font-semibold leading-normal">booktopiavn@gmail.com</h3>
                <p className="flex items-center gap-1 text-grayText">
                  <FaRegEdit />
                  Sửa hồ sơ
                </p>
              </div>
            </div>
            {/* Danh sách menu */}
            <ul className="flex flex-col gap-7 mt-10">
              {profileMenuList.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      isActive
                        ? "text-mainDark flex items-center gap-2 font-normal leading-normal"
                        : "flex items-center hover:text-mainDark gap-2 font-normal leading-normal"
                    }>
                    {item.icon}
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/5">
            <PageTitle title="Cập nhật tài khoản" className="text-mainDark mb-2"></PageTitle>
            <div className="text-grayText leading-normal font-normal mb-5">
              Chỉnh sửa thông tin cá nhân, tài khoản và mật khẩu
            </div>
            <form action="" className="flex flex-col gap-6">
              <div className="flex items-center justify-center gap-5">
                <div className="w-full">
                  <label htmlFor="name">Họ và tên</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Email"
                    className="input input-bordered w-full mt-2"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="username">Tên người dùng</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Mhong1208@"
                    className="input input-bordered w-full mt-2"
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="birthday">Ngày sinh</label>
                <input
                  type="text"
                  id="birthday"
                  placeholder="dd/mm/yyyy"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div className="w-full">
                <label htmlFor="image">Hình ảnh</label>
                <input
                  type="file"
                  id="image"
                  placeholder="Quận 12, Thành phố Hồ Chí Minh"
                  className="input input-bordered h-full py-3 w-full mt-2"
                />
              </div>
              <div className="w-full">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Mhong12082004@gmail.com"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div className="w-full">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div className="w-full">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="(+84) 776 831 909"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div className="w-full">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Quận 12, Thành phố Hồ Chí Minh"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div>
                <Button children="Lưu" className="rounded-[10px]"></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
