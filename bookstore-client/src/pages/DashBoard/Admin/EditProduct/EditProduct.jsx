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
import Button from "../../../../components/Button/Button";

const EditProduct = () => {
  const isAdmin = true;
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout operations here (e.g., clearing authentication tokens)
    // Then navigate to the home page
    navigate("/");
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
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
            <PageTitle title="Cập nhật sản phẩm" className="text-mainDark" />
          </div>
          <div className="border rounded-[10px] py-8 px-5 mt-7">
            <form action="" className="flex flex-col gap-6">
              <div className="flex gap-10 items-center">
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">*Tên sản phẩm</label>
                  <input type="text" className="input input-bordered w-full" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">Tác giả</label>
                  <input type="text" className="input input-bordered w-full" />
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="image">*Hình ảnh</label>
                  {selectedImage && (
                    <div className="w-52 flex">
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="w-full object-contain rounded-lg max-h-48"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    id="image"
                    className="file-input file-input-success w-full"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="flex gap-10 items-center">
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">*Danh mục</label>
                  <input type="text" className="input input-bordered w-full" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">Nhà xuất bản</label>
                  <input type="text" className="input input-bordered w-full" />
                </div>
              </div>
              <div className="flex gap-10 items-center">
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">Giá sản phẩm</label>
                  <input type="text" className="input input-bordered w-full" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="">Số lượng</label>
                  <input type="text" className="input input-bordered w-full" />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="">Mô tả</label>
                <textarea type="text" className="input input-bordered w-full h-32" />
              </div>
              <div className="flex items-center gap-3">
                <Button children="Lưu"></Button>
                <Button children="Hủy" className="bg-secondary"></Button>
              </div>
            </form>
          </div>
          {/* Content goes here */}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
