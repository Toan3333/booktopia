import React, { useState } from "react";
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

const ManageBlog = () => {
  const isAdmin = true;
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout operations here (e.g., clearing authentication tokens)
    // Then navigate to the home page
    navigate("/");
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
              <MenuItem component={<Link to="/dashboard/add-category" />}>Thêm danh mục</MenuItem>
            </SubMenu>
            <SubMenu label="Quản lý sản phẩm" icon={<FaBook className="w-5 h-5" />}>
              <MenuItem component={<Link to="/dashboard/manage-product" />}>
                Danh sách sản phẩm
              </MenuItem>
              <MenuItem component={<Link to="/dashboard/add-product" />}>Thêm sản phẩm</MenuItem>
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
          <div className="flex items-center justify-between pb-8 border-b">
            <PageTitle title="Quản lý bài viết" className="text-mainDark" />
            <div>
              <button className="flex items-center gap-2 bg-mainDark py-3 px-5 text-white font-semibold leading-normal rounded-[10px]">
                <FaPlus></FaPlus>Thêm
              </button>
            </div>
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <table className="table w-full">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th>Hình ảnh</th>
                  <th>Tên bài viết</th>
                  <th>Nội dung</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <img src="./images/product.png" className="w-20 h-20" alt="" />
                  </td>
                  <td>Những lợi ích của việc đọc sách </td>
                  <td className=" text-left">
                    <p className=" max-w-[600px] w-full line-clamp-4 text-left flex">
                      Sách Tâm lý - Kỹ năng sống cung cấp kiến thức và kỹ năng để quản lý cảm xúc,
                      cải thiện giao tiếp và giải quyết vấn đề, giúp phát triển cá nhân và nâng cao
                      chất lượng cuộc sống.
                    </p>
                  </td>

                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <Link to="/dashboard/edit-product">
                        <FaUserEdit className="w-5 h-5 text-main" />
                      </Link>
                      <a href="#">
                        <FaTrashAlt className="w-5 h-4 text-red" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <img src="./images/product.png" className="w-20 h-20" alt="" />
                  </td>
                  <td>Những lợi ích của việc đọc sách </td>
                  <td className="">
                    <p className="w-full line-clamp-4 flex">
                      Sách nuôi dạy con cung cấp kiến thức và phương pháp giúp cha mẹ chăm sóc, giáo
                      dục và phát triển toàn diện cho con cái. Chúng bao gồm các chủ đề như dinh
                      dưỡng, sức khỏe, tâm lý trẻ em và kỹ năng nuôi dạy để hỗ trợ con cái phát
                      triển tốt nhất.
                    </p>
                  </td>

                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <Link to="/dashboard/edit-product">
                        <FaUserEdit className="w-5 h-5 text-main" />
                      </Link>
                      <a href="#">
                        <FaTrashAlt className="w-5 h-4 text-red" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <img src="./images/product.png" className="w-20 h-20" alt="" />
                  </td>
                  <td>Những lợi ích của việc đọc sách </td>
                  <td className="">
                    <p className="w-full line-clamp-4 flex">
                      Sách ngoại ngữ giúp người học phát triển kỹ năng nghe, nói, đọc, viết và hiểu
                      ngôn ngữ mới. Chúng thường bao gồm từ vựng, ngữ pháp, bài tập thực hành và các
                      bài đọc để nâng cao khả năng giao tiếp và hiểu biết văn hóa của ngôn ngữ đó.
                    </p>
                  </td>

                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <Link to="/dashboard/edit-product">
                        <FaUserEdit className="w-5 h-5 text-main" />
                      </Link>
                      <a href="#">
                        <FaTrashAlt className="w-5 h-4 text-red" />
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Content goes here */}
        </div>
      </div>
    </div>
  );
};

export default ManageBlog;
