import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBook, FaClipboardList, FaRegEdit, FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";

import PageTitle from "../../../components/PageTitle/PageTitle";

import Button from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";

const AddVoucher = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const handleLogout = () => {
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCancel = () => {
    navigate("/admin/manage-voucher");
  };

  return (
    <div className="flex min-h-screen border">
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
            <MenuItem component={<Link to="/admin/manage-category" />}>Danh sách danh mục</MenuItem>
          </SubMenu>
          <SubMenu label="Quản lý sản phẩm" icon={<FaBook className="w-5 h-5" />}>
            <MenuItem component={<Link to="/admin/manage-product" />}>Danh sách sản phẩm</MenuItem>
            <MenuItem component={<Link to="/admin/manage-author" />}>Tác giả</MenuItem>
            <MenuItem component={<Link to="/admin/manage-publishes" />}>Nhà xuất bản</MenuItem>
          </SubMenu>
          <MenuItem component={<Link to="/admin/manage-items" />}>
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
              Đăng xuất
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
      <div className="flex-1 p-6">
        <HeaderAdmin />
        <div className="flex items-center justify-between pb-8 border-b">
          <PageTitle title="Thêm voucher" className="text-mainDark" />
        </div>
        <div className="border rounded-[10px] py-8 px-5 mt-7">
          <form className="flex flex-col gap-6">
            <div className="flex items-center gap-12">
              <div className="w-2/4 flex flex-col gap-3">
                <label htmlFor="">*Mã voucher</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="w-2/4 flex flex-col gap-3">
                <label htmlFor="">*Loại voucher</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="w-2/6 flex flex-col gap-3">
                <label htmlFor="">*Đơn hàng tối thiểu</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="w-2/6 flex flex-col gap-3">
                <label htmlFor="">Ngày hiệu lực</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="w-2/6 flex flex-col gap-3">
                <label htmlFor="">Ngày kết thúc</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Mô tả</label>
              <textarea className="textarea textarea-bordered" placeholder="Nhập mô tả"></textarea>
            </div>
            <div className="flex items-center gap-3">
              <Button>Lưu</Button>
              <Button className="bg-secondary" onClick={handleCancel}>
                Hủy
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVoucher;
