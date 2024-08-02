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

const ManageCategory = () => {
  const isAdmin = true;
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout operations here (e.g., clearing authentication tokens)
    // Then navigate to the home page
    navigate("/");
  };

  const [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:3000/category");
        const data = response.data;
        setListCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/category/delete/${id}`);
      Swal.fire({
        title: "Bạn có muốn xóa?",
        text: "Đã xóa không thể khôi phục",
        icon: "warning",
        showCancelButton: "Hủy",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Danh mục của bạn đã được xóa.",
            icon: "success",
          }).then(() => {
            window.location.reload(); // Reload the page after deleting
          });
        }
      });
    } catch (error) {
      console.log(error);
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
            </SubMenu>
            <SubMenu label="Quản lý sản phẩm" icon={<FaBook className="w-5 h-5" />}>
              <MenuItem component={<Link to="/dashboard/manage-product" />}>
                Danh sách sản phẩm
              </MenuItem>
              <MenuItem component={<Link to="/dashboard/manage-author" />}>Tác giả</MenuItem>
              <MenuItem component={<Link to="/dashboard/manage-publishes" />}>
                Nhà xuất bản
              </MenuItem>
            </SubMenu>
            <MenuItem component={<Link to="/dashboard/manage-items" />}>
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
              <MenuItem component={<Link to="/dashboard/add-blog" />}>Thêm bài viết</MenuItem>
            </SubMenu>
            <MenuItem onClick={handleLogout}>
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
            <PageTitle title="Quản lý danh mục" className="text-mainDark" />
            <div>
              <Link to="/dashboard/add-category">
                <button className="flex items-center gap-2 bg-mainDark py-3 px-5 text-white font-semibold leading-normal rounded-[10px]">
                  <FaPlus></FaPlus>Thêm
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <table className="table w-full">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th>Tên danh mục</th>
                  <th>Mô tả</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {listCategory.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td className="max-w-[300px]">{item.description}</td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <Link to={`/dashboard/edit-category/${item._id}`}>
                          <FaUserEdit className="w-5 h-5 text-main" />
                        </Link>
                        <button onClick={(e) => handleDelete(item._id)}>
                          <FaTrashAlt className="w-5 h-4 text-red" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Content goes here */}
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
