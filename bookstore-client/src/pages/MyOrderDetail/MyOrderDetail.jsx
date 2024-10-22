import React from "react";
import { FaCalendar, FaHeart, FaImage, FaRegEdit, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";

const MyOrderDetail = () => {
  const profileMenuList = [
    { id: 1, name: "Tài khoản của tôi", icon: <FaUser />, link: "/profile" },
    { id: 2, name: "Sản phẩm yêu thích", icon: <FaHeart />, link: "/favorites" },
    { id: 3, name: "Đơn hàng của bạn", icon: <FaCalendar />, link: "/my-orders" },
    { id: 4, name: "Đăng xuất", icon: <FiLogOut />, link: "/logout" },
  ];

  return (
    <div className="py-10">
      <div className="container">
        <div className="flex gap-6">
          <div className="max-w-[250px] w-full">
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
          <div className="w-[90%]">
            <PageTitle title="Chi tiết đơn hàng" className="text-mainDark mb-2"></PageTitle>
            <div className="text-grayText leading-normal font-normal mb-5">
              Theo dõi thông tin đơn hàng của bạn
            </div>
            <table className="table w-full">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th className="text-center flex items-center justify-center max-w-[150px]">
                    <FaImage className="w-6 h-6 " />
                  </th>
                  <th>Tên sách</th>
                  <th>Phân loại</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td className="flex items-center justify-center max-w-[150px]">
                    <img src="./images/product.png" className="w-full" alt="" />
                  </td>
                  <td>
                    <div className="flex flex-col  gap-3">
                      <div className="">Cây cam ngọt của tôi</div>
                      <div className="">x1</div>
                    </div>
                  </td>
                  <td>Văn học</td>
                  <td>199000đ</td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center justify-end mt-6 gap-5">
              <Button className="bg-secondary">Hủy</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderDetail;
