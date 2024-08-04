import React from "react";
import { FaCalendar, FaHeart, FaRegEdit, FaRegTrashAlt, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../redux/slices/favouritesSlide"; 


const Favorite = () => {
  const dispatch = useDispatch();
  const favouriteItems = useSelector((state) => state.favourite?.items) || []
  const profileMenuList = [
    { id: 1, name: "Tài khoản của tôi", icon: <FaUser />, link: "/profile" },
    { id: 2, name: "Sản phẩm yêu thích", icon: <FaHeart />, link: "/favorites" },
    { id: 3, name: "Đơn hàng của bạn", icon: <FaCalendar />, link: "/my-orders" },
    { id: 4, name: "Đăng xuất", icon: <FiLogOut />, link: "/logout" },
  ];

  
  const handleRemoveItem = (itemId) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#166534",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, xóa nó!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(remove(itemId));
        Swal.fire({
          title: "Đã xóa!",
          text: "Sản phẩm đã được xóa khỏi yêu thích.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="py-10">
      <div className="container">
        <div className="flex gap-10">
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
            <PageTitle title="Sản phẩm yêu thích" className="text-mainDark mb-2"></PageTitle>
            <div className="text-grayText leading-normal font-normal mb-5">Sản phẩm yêu thích</div>
            <table className="table">
              <thead className="text-[16px] font-semibold leading-normal text-black">
                <tr>
                  <th>#</th>
                  <th>Hình ảnh</th>
                  <th>Tên sách</th>
                  <th>Tác giả</th>
                  <th>Danh mục</th>
                  <th>Giá</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="font-normal text-[16px]">
              {favouriteItems.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img src={`http://localhost:3000/images/${item.image1}`} className="w-20 h-20 object-cover" alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td className="max-w-[200px]">{item.author.authorName}</td>
                  <td>{item.category.categoryName}</td>
                  <td>{item.price2}đ</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <FaRegTrashAlt onClick={() => handleRemoveItem(item._id)} className="text-red text-center"></FaRegTrashAlt>
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

export default Favorite;
