import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBook,
  FaClipboardList,
  FaMoneyBill,
  FaProductHunt,
  FaRegEdit,
  FaShoppingBag,
  FaTrashAlt,
  FaUser,
  FaUserEdit,
  FaUsers,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import "./DashBoard.css";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import PageTitle from "../../../components/PageTitle/PageTitle";
import SellProductAdminList from "../../../layouts/components/SellProductAdmin/SellProductAdminList";
import axios from "axios";

const DashBoard = () => {
  const isAdmin = true;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout operations here (e.g., clearing authentication tokens)
    // Then navigate to the home page
    navigate("/");
  };
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategory, setTotalCategory] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    const getInfoDashboard = async () => {
      try {
        const [getTotalProduct, getTotalCategory, getTotalUser] = await axios.all([
          axios.get("http://localhost:3000/products"),
          axios.get("http://localhost:3000/category"),
          axios.get("http://localhost:3000/users"),
        ]);
        setTotalProducts(getTotalProduct.data.Product.length);
        setTotalCategory(getTotalCategory.data.length);
        setTotalUser(getTotalUser.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getInfoDashboard();
  }, []);

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
          <PageTitle title="Dashboard" />
          {/* Content goes here */}
          <div className="grid grid-cols-4 gap-7 mt-5">
            <div className="bg-white p-4 border rounded-lg shadow py-5 px-6">
              <div className="flex items-center justify-between">
                <div className="">
                  <PageTitle title="89,935" />
                  {/* Tổng doanh thu của các đơn hàng */}
                  {/* Đơn hàng: Thống kê số lượng đơn hàng đã hoàn thành và đơn hàng đang chờ xử lý. */}
                  <div className="">Doanh thu</div>
                </div>
                <div className="w-10 h-10 rounded-md border flex items-center justify-center text-mainDark">
                  <FaMoneyBill className="w-7 h-7" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow py-5 px-6">
              <div className="flex items-center justify-between">
                <div className="">
                  <PageTitle title={totalProducts} />
                  <div className="">Sản phẩm</div>
                </div>
                <div className="w-10 h-10 rounded-md border flex items-center justify-center text-mainDark">
                  <FaProductHunt className="w-7 h-7" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow py-5 px-6">
              <div className="flex items-center justify-between">
                <div className="">
                  <PageTitle title={totalCategory} />
                  <div className="">Danh mục</div>
                </div>
                <div className="w-10 h-10 rounded-md border flex items-center justify-center text-mainDark">
                  <BiSolidCategoryAlt className="w-7 h-7" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow py-5 px-6">
              <div className="flex items-center justify-between">
                <div className="">
                  <PageTitle title={totalUser} />
                  <div className="">Người dùng</div>
                </div>
                <div className="w-10 h-10 rounded-md border flex items-center justify-center text-mainDark">
                  <FaUsers className="w-7 h-7" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="flex justify-between gap-7">
              <div className="w-[55%]">
                <div className="flex flex-col gap-5">
                  <div className="w-full">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1681825268400-c561bd47d586?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"
                      className="rounded-[10px] w-full h-[223px]"
                      alt="Book"
                    />
                  </div>
                  <div className="w-full">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1681825268400-c561bd47d586?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"
                      className="rounded-[10px] w-full h-[223px]"
                      alt="Book"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[45%]">
                <div className="rounded-[10px] border py-6 px-5">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-10 h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      <FaShoppingBag />
                    </div>
                    <h3 className="leading-normal font-semibold text-black">Sản phẩm bán chạy</h3>
                  </div>
                  <SellProductAdminList />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 border rounded-[30px] p-5">
            <h3 className="text-lg font-semibold">Đơn hàng</h3>
            <table className="table">
              <thead className="text-[16px] font-semibold text-black">
                <tr>
                  <th>#</th>
                  <th>Mã đơn hàng</th>
                  <th>Ngày lập</th>
                  <th>Người mua</th>
                  <th>Địa chỉ</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>BOKTOPIA001</td>
                  <td>23/08/2004</td>
                  <td>Bùi Liệm</td>
                  <td>Quận 12, TP Hồ Chí Minh</td>
                  <td>199000đ</td>
                  <td>Chưa xác nhận</td>
                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <a href="#">
                        <FaUserEdit className="w-5 h-5 text-main" />
                      </a>
                      <a href="#">
                        <FaTrashAlt className="w-5 h-4 text-red" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>BOKTOPIA001</td>
                  <td>23/08/2004</td>
                  <td>Bùi Liệm</td>
                  <td>Quận 12, TP Hồ Chí Minh</td>
                  <td>199000đ</td>
                  <td>Chưa xác nhận</td>
                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <a href="#">
                        <FaUserEdit className="w-5 h-5 text-main" />
                      </a>
                      <a href="#">
                        <FaTrashAlt className="w-5 h-4 text-red" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>BOKTOPIA001</td>
                  <td>23/08/2004</td>
                  <td>Bùi Liệm</td>
                  <td>Quận 12, TP Hồ Chí Minh</td>
                  <td>199000đ</td>
                  <td>Chưa xác nhận</td>
                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <a href="#">
                        <FaUserEdit className="w-5 h-5 text-main" />
                      </a>
                      <a href="#">
                        <FaTrashAlt className="w-5 h-4 text-red" />
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
