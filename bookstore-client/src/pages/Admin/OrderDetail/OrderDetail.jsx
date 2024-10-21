import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaImage,
  FaRegEdit,
  FaTrashAlt,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";

import axios from "axios";
import Swal from "sweetalert2";

import PageTitle from "../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import { URL_API } from "../../../constants/constants";

const OrderDetail = () => {
  const navigate = useNavigate();
  const [listOrder, setOrder] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const statusOptions = ["Chờ xử lý", "Đang xử lý", "Đã gửi", "Đã giao", "Đã hủy"]; // Danh sách trạng thái

  const handleLogout = () => {
    // Perform logout operations here (e.g., clearing authentication tokens)
    // Then navigate to the home page
    navigate("/");
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${URL_API}/orders`);
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${URL_API}/orders/${orderId}/status`, { status: newStatus });
      setOrder((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${URL_API}/orders/${id}`);

      if (response.status === 200) {
        Swal.fire({
          title: "Bạn có muốn xóa?",
          text: "Đã xóa không thể khôi phục",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Xóa",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Hủy đơn hàng thành công!",
              icon: "success",
            }).then(() => {
              setOrder((prevOrders) => prevOrders.filter((order) => order._id !== id));
            });
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Lỗi!",
        text: error.response?.data?.message || "Có lỗi xảy ra khi xóa đơn hàng.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="flex min-h-screen border">
        {/* Sidebar */}
        <Sidebar
          className={`relative border p-3 bg-white ${collapsed ? "collapsed" : "expanded"}`}
          width={collapsed ? "0px" : "270px"}>
          <Menu className="bg-white">
            <div className="flex items-center justify-center mb-6">
              <img src="./images/logo.png" alt="Logo" />
            </div>
            <MenuItem component={<Link to="/admin/dashboard" />}>
              <div className="flex items-center gap-4">
                <AiFillDashboard className="w-5 h-5" />
                Dashboard
              </div>
            </MenuItem>

            <SubMenu label="Quản lý danh mục" icon={<AiOutlineBars className="w-5 h-5" />}>
              <MenuItem component={<Link to="/admin/manage-category" />}>
                Danh sách danh mục
              </MenuItem>
            </SubMenu>
            <SubMenu label="Quản lý sản phẩm" icon={<FaBook className="w-5 h-5" />}>
              <MenuItem component={<Link to="/admin/manage-product" />}>
                Danh sách sản phẩm
              </MenuItem>
              <MenuItem component={<Link to="/admin/manage-author" />}>Tác giả</MenuItem>
              <MenuItem component={<Link to="/admin/manage-publishes" />}>Nhà xuất bản</MenuItem>
            </SubMenu>
            <MenuItem component={<Link to="/admin/manage-order" />}>
              <div className="flex items-center gap-4">
                <FaClipboardList className="w-5 h-5" />
                Quản lý đơn hàng
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/admin/manage-user" />}>
              <div className="flex items-center gap-4">
                <FaUser />
                Quản lý tài khoản
              </div>
            </MenuItem>
            <SubMenu label="Quản lý bài viết" icon={<FaRegEdit className="w-5 h-5" />}>
              <MenuItem component={<Link to="/admin/manage-blog" />}>Danh sách bài viết</MenuItem>
            </SubMenu>
            <MenuItem onClick={handleLogout}>
              <div className="flex items-center gap-4">
                <MdLogout />
                Logout
              </div>
            </MenuItem>
          </Menu>
        </Sidebar>
        {/* Nút toggle nằm bên ngoài Sidebar */}
        <button onClick={() => setCollapsed(!collapsed)} className="toggle-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </button>
        {/* Main Content */}
        <div className="flex-1 p-6">
          <HeaderAdmin />
          <div className="flex items-center justify-between pb-8 border-b pt-3">
            <PageTitle title="Chi tiết đơn hàng" className="text-mainDark" />
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <form
              action=""
              className="flex flex-col gap-6
            ">
              <div className="flex items-center justify-between gap-12">
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">*Mã đơn hàng</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">Ngày lập</label>
                  <input
                    type="date"
                    placeholder="15/07/2024"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="">*Tên người mua</label>
                <input
                  type="text"
                  placeholder="Trần Anh Toàn"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="">*Địa chỉ</label>
                <input
                  type="text"
                  placeholder="Q12, TPHCM"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex items-center justify-between gap-12">
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">Giá sản phẩm</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">Số lượng</label>
                  <input type="text" placeholder="3" className="input input-bordered w-full" />
                </div>
              </div>
              <div className="w-[48.5%] flex flex-col gap-2">
                <label htmlFor="">Trạng thái</label>
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Chưa xác nhận
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
              </div>
            </form>
            <table className="table w-full">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center flex items-center justify-center">
                    <FaImage className="w-6 h-6 " />
                  </th>
                  <th className="text-center">Tên sách</th>
                  <th className="text-center">Phân loại</th>
                  <th className="text-center">Giá</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td className="flex items-center justify-center">
                    <img src="./images/product.png" alt="" />
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <div className="">Cây cam ngọt của tôi</div>
                      <div className="">x1</div>
                    </div>
                  </td>
                  <td className="text-center">Văn học</td>
                  <td className="text-center">199000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
