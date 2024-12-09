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
  FaGift,
  FaCommentAlt,
} from "react-icons/fa";
import { MdLogout, MdOutlinePreview } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import PageTitle from "../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { URL_API } from "../../../constants/constants";
import Cookies from "js-cookie";
const ManageCategory = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [user, setUser] = useState({});
  // Lấy dữ liệu người dùng từ cookie
  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser.user);
    }
  }, []);

  // Hàm đăng xuất
  // Đăng xuất xóa cookie người dùng
  const handleLogout = () => {
    // Xử lý logout, ví dụ xóa cookie và chuyển hướng người dùng
    Cookies.remove("user");
    setUser(null);
    // Chuyển hướng hoặc cập nhật state để hiển thị UI phù hợp
    navigate("/sign-in");
    window.location.reload();
  };

  // Hàm lấy danh sách danh mục
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${URL_API}/category`);
      setListCategory(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

  // Gọi hàm lấy danh mục khi component được render
  useEffect(() => {
    fetchCategory();
  }, []);

  // Hàm xóa danh mục
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${URL_API}/category/delete/${id}`);
      if (response.data.mess) {
        // Thông báo lỗi nếu danh mục không thể xóa
        toast.error(response.data.mess);
      } else {
        // Thông báo thành công và làm mới danh sách
        toast.success("Xóa danh mục thành công!");
        fetchCategory();
      }
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
      toast.error("Đã có lỗi xảy ra khi xóa danh mục!");
    }
  };

  return (
    <div>
      {/* Toast Container để hiển thị thông báo */}
      <ToastContainer autoClose={3000} />

      {/* Giao diện chính */}
      <div className="flex min-h-screen border">
        {/* Sidebar */}
        <Sidebar
          className={`relative border p-3 bg-white ${
            collapsed ? "collapsed" : "expanded"
          }`}
          width={collapsed ? "0px" : "270px"}
        >
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

            <SubMenu
              label="Quản lý danh mục"
              icon={<AiOutlineBars className="w-5 h-5" />}
            >
              <MenuItem component={<Link to="/admin/manage-category" />}>
                Danh sách danh mục
              </MenuItem>
            </SubMenu>
            <SubMenu
              label="Quản lý sản phẩm"
              icon={<FaBook className="w-5 h-5" />}
            >
              <MenuItem component={<Link to="/admin/manage-product" />}>
                Danh sách sản phẩm
              </MenuItem>
              <MenuItem component={<Link to="/admin/manage-author" />}>
                Tác giả
              </MenuItem>
              <MenuItem component={<Link to="/admin/manage-publishes" />}>
                Nhà xuất bản
              </MenuItem>
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
            <MenuItem component={<Link to="/admin/manage-voucher" />}>
              <div className="flex items-center gap-4">
                <FaGift />
                Quản lý voucher
              </div>
            </MenuItem>
            <SubMenu
              label="Quản lý bài viết"
              icon={<FaRegEdit className="w-5 h-5" />}
            >
              <MenuItem component={<Link to="/admin/manage-blog" />}>
                Danh sách bài viết
              </MenuItem>
            </SubMenu>
            <MenuItem component={<Link to="/admin/manage-contact" />}>
              <div className="flex items-center gap-4">
                <MdMarkEmailRead />
                Quản lý liên hệ
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/admin/stock" />}>
              <div className="flex items-center gap-4">
                <MdInventory />
                Quản lý tồn kho
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/admin/manage-comment" />}>
              <div className="flex items-center gap-4">
                <FaCommentAlt />
                Quản lý bình luận
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/admin/manage-review" />}>
              <div className="flex items-center gap-4">
                <MdOutlinePreview />
                Quản lý đánh giá
              </div>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <div className="flex items-center gap-4">
                <MdLogout />
                Đăng xuất
              </div>
            </MenuItem>
          </Menu>
        </Sidebar>

        {/* Nút toggle sidebar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="toggle-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
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
            <PageTitle title="Quản lý danh mục" className="text-mainDark" />
            <div>
              <Link to="/admin/add-category">
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
                        <Link to={`/admin/edit-category/${item._id}`}>
                          <FaUserEdit className="w-5 h-5 text-main" />
                        </Link>
                        <button onClick={() => handleDelete(item._id)}>
                          <FaTrashAlt className="w-5 h-4 text-red" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
