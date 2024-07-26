import React from "react";
import { FaCalendar, FaHeart, FaRegEdit, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";

const MyOrders = () => {
  const profileMenuList = [
    { id: 1, name: "Tài khoản của tôi", icon: <FaUser />, link: "/profile" },
    { id: 2, name: "Sản phẩm yêu thích", icon: <FaHeart />, link: "/favorites" },
    { id: 3, name: "Đơn hàng của bạn", icon: <FaCalendar />, link: "/my-orders" },
    { id: 4, name: "Đăng xuất", icon: <FiLogOut />, link: "/logout" },
  ];

  const statusOrderlist = [
    { id: 1, name: "Tất cả đơn hàng" },
    { id: 2, name: "Chờ xác nhận" },
    { id: 3, name: "Vận chuyển" },
    { id: 4, name: "Thành công" },
    { id: 5, name: "Đã hủy" },
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
            <PageTitle title="Đơn hàng của tôi" className="text-mainDark mb-2"></PageTitle>
            <div className="text-grayText leading-normal font-normal mb-5">
              Theo dõi thông tin đơn hàng của bạn
            </div>
            <div className="bg-[#f9f9f9] py-4 px-3">
              <div className="">
                <ul className="flex items-center justify-between gap-10">
                  {statusOrderlist.map((item) => (
                    <li key={item.id}>
                      <a href="#">{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <table className="table">
              <thead className="text-[16px] font-semibold leading-normal text-black">
                <tr>
                  <th>#</th>
                  <th>Mã đơn hàng</th>
                  <th>Ngày lập</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody className="font-normal text-[16px]">
                <tr>
                  <td>1</td>
                  <td>BOKTOPIA001</td>
                  <td>23/08/2004</td>
                  <td>Quận 12, TP Hồ Chí Minh</td>
                  <td>0776 831 909</td>
                  <td>199000 đ</td>
                  <td>Chưa xác nhận</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>BOKTOPIA001</td>
                  <td>23/08/2004</td>
                  <td>Quận 12, TP Hồ Chí Minh</td>
                  <td>0776 831 909</td>
                  <td>199000 đ</td>
                  <td>Chưa xác nhận</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>BOKTOPIA001</td>
                  <td>23/08/2004</td>
                  <td>Quận 12, TP Hồ Chí Minh</td>
                  <td>0776 831 909</td>
                  <td>199000 đ</td>
                  <td>Chưa xác nhận</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
