import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaPlus,
  FaRegEdit,
  FaTrashAlt,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import "../DashBoard.css";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../../components/HeaderAdmin/HeaderAdmin";
import axios from "axios";
import Swal from "sweetalert2";

const ManageOrder = () => {
  const navigate = useNavigate();
  const [listOrder, setOrder] = useState([]);
  const statusOptions = ["Chờ xử lý", "Đang xử lý", "Đã gửi", "Đã giao", "Đã hủy"]; // Danh sách trạng thái

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/orders/${orderId}/status`, { status: newStatus });
      setOrder((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/orders/${id}`);
      
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
              setOrder((prevOrders) =>
                prevOrders.filter((order) => order._id !== id)
              );
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
        <Sidebar className="relative border p-3 bg-white" width="270px">
          <Menu className="bg-white">
            <div className="flex items-center justify-center mb-6">
              <img src="./images/logo.png" alt="Logo" />
            </div>
            <MenuItem component={<Link to="/dashboard" />}>
              <div className="flex items-center gap-4">
                <AiFillDashboard className="w-5 h-5" />
                Dashboard
              </div>
            </MenuItem>

            <SubMenu label="Quản lý danh mục" icon={<AiOutlineBars className="w-5 h-5" />}>
              <MenuItem component={<Link to="/dashboard/manage-category" />}>
                Danh sách danh mục
              </MenuItem>
              <MenuItem component={<Link to="/dashboard/add-category" />}>
                Thêm danh mục
              </MenuItem>
            </SubMenu>
            <SubMenu label="Quản lý sản phẩm" icon={<FaBook className="w-5 h-5" />}>
              <MenuItem component={<Link to="/dashboard/manage-product" />}>
                Danh sách sản phẩm
              </MenuItem>
              <MenuItem component={<Link to="/dashboard/add-product" />}>
                Thêm sản phẩm
              </MenuItem>
            </SubMenu>
            <MenuItem component={<Link to="/dashboard/manage-order" />}>
              <div className="flex items-center gap-4">
                <FaClipboardList className="w-5 h-5" />
                Quản lý đơn hàng
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/dashboard/manage-user" />}>
              <div className="flex items-center gap-4">
                <FaUser />
                Quản lý tài khoản
              </div>
            </MenuItem>
            <SubMenu label="Quản lý bài viết" icon={<FaRegEdit className="w-5 h-5" />}>
              <MenuItem component={<Link to="/dashboard/manage-blog" />}>
                Danh sách bài viết
              </MenuItem>
              <MenuItem component={<Link to="/dashboard/add-blog" />}>
                Thêm bài viết
              </MenuItem>
            </SubMenu>
            <MenuItem onClick={() => navigate("/")}>
              <div className="flex items-center gap-4">
                <MdLogout />
                Logout
              </div>
            </MenuItem>
          </Menu>
        </Sidebar>
        {/* Main Content */}
        <div className="flex-1 p-6">
          <HeaderAdmin />
          <div className="flex items-center justify-between pb-8 border-b pt-3">
            <PageTitle title="Quản lý đơn hàng" className="text-mainDark" />
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <table className="table w-full">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th>Mã đơn hàng</th>
                  <th>Ngày lập</th>
                  <th>Tên tài khoản</th>
                  <th>Địa chỉ</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {listOrder.map((order, index) => {
                  const dateObj = new Date(order.date);
                  const formattedDate = dateObj.toLocaleDateString("vi-VN"); // 'vi-VN' for dd/mm/yyyy format

                  return (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order.orderId}</td>
                      <td>{formattedDate}</td>
                      <td>{order.name}</td>
                      <td>{order.address}</td>
                      <td>
                        {Number(order.total).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => handleDelete(order._id)}>
                            <FaTrashAlt className="w-5 h-4 text-red" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
