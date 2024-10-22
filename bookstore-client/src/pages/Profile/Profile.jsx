import React, { useEffect, useState, useCallback } from "react";
import { FaRegEdit, FaUser, FaHeart, FaCalendar } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import { URL_API } from "../../constants/constants";
import { showSwalFireSuccess } from "../../helpers/helpers";

const Profile = () => {
  const handleLogout = () => {
    // Xử lý logout, ví dụ xóa cookie và chuyển hướng người dùng
    Cookies.remove("user");
    setUser(null);
    // Chuyển hướng hoặc cập nhật state để hiển thị UI phù hợp
    navigate("/sign-in");
    window.location.reload();
  };
  const defaultAvatar =
    "https://images.unsplash.com/photo-1686170287433-c95faf6d3608?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1wYXJ0bmVy";
  const profileMenuList = [
    { id: 1, name: "Tài khoản của tôi", icon: <FaUser />, link: "/profile" },
    { id: 2, name: "Sản phẩm yêu thích", icon: <FaHeart />, link: "/favorites" },
    { id: 3, name: "Đơn hàng của bạn", icon: <FaCalendar />, link: "/my-orders" },
    { id: 4, name: "Đăng xuất", icon: <FiLogOut />, action: handleLogout },
  ];

  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const userId = JSON.parse(Cookies.get("user")).user._id;
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  // Xử lý khi người dùng chọn hình ảnh mới
  const handleImgChange = useCallback((e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setSelectedImage({
        file: files[0],
        preview: imageUrl,
      });
    }
  }, []);

  // Lấy dữ liệu người dùng từ cookie
  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser.user);
      console.log(parsedUser);
    }
  }, []);

  // Lấy thông tin người dùng từ API khi component mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${URL_API}/users/${userId}`);
        if (res.status === 200) {
          const data = res.data;
          setValue("name", data.name);
          setValue("username", data.username);
          setValue("date", data.date);
          setValue("email", data.email);
          setValue("phone", data.phone);
          setValue("address", data.address);
          // Hiển thị hình ảnh hiện tại
          setImage(data.image ? `${URL_API}/images/${data.image}` : defaultAvatar);

          // console.log("Image URL:", image);
          // console.log("Selected Image Preview:", selectedImage?.preview);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    getUser();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("username", data.username);
      formData.append("date", data.date);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      if (selectedImage?.file) {
        formData.append("image", selectedImage.file);
      }

      const res = await axios.put(`${URL_API}/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        const updatedUser = res.data.userUpdate;
        Cookies.set("user", JSON.stringify({ user: { _id: updatedUser._id, ...updatedUser } }), {
          expires: 1,
        });
        setUser(updatedUser);
        setImage(`${URL_API}/images/${updatedUser.image}`);
        showSwalFireSuccess("Thông tin hồ sơ của bạn đã được cập nhật.");

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="py-10">
      <div className="container">
        <div className="flex gap-10">
          <div className="max-w-[300px] w-full">
            <div className="flex items-center gap-2">
              <img
                src={selectedImage?.preview || image}
                className="w-[50px] h-[50px] rounded-full"
                alt="Avatar"
              />
              <div>
                <h3 className="font-semibold">{user.email}</h3>
                <p className="flex items-center gap-1 text-grayText">
                  <FaRegEdit />
                  Sửa hồ sơ
                </p>
              </div>
            </div>
            <ul className="flex flex-col gap-7 mt-10">
              {profileMenuList.map((item) => (
                <li key={item.id}>
                  {item.link ? (
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        isActive
                          ? "text-mainDark flex items-center gap-2 font-normal leading-normal"
                          : "flex items-center text-black hover:text-mainDark gap-2 font-normal leading-normal"
                      }>
                      {item.icon}
                      {item.name}
                    </NavLink>
                  ) : (
                    <button
                      onClick={item.action}
                      className="flex items-center text-black hover:text-mainDark gap-2 font-normal leading-normal">
                      {item.icon}
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/5">
            <PageTitle title="Cập nhật tài khoản" className="text-mainDark mb-2"></PageTitle>
            <div className="text-grayText leading-normal font-normal mb-5">
              Chỉnh sửa thông tin cá nhân, tài khoản và mật khẩu
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="flex items-center justify-center gap-5">
                <div className="w-full">
                  <label htmlFor="name">Họ và tên</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Họ và tên"
                    className="input input-bordered w-full mt-2"
                    {...register("name")}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="username">Tên người dùng</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Tên người dùng"
                    className="input input-bordered w-full mt-2"
                    {...register("username")}
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="date">Ngày sinh</label>
                <input
                  type="date"
                  id="date"
                  placeholder="dd/mm/yyyy"
                  className="input input-bordered w-full mt-2"
                  {...register("date")}
                />
              </div>
              <div className="w-full">
                <label htmlFor="image">Hình ảnh</label>
                <img
                  src={selectedImage?.preview || image}
                  className="w-[50px] h-[50px] rounded-full"
                  alt="Avatar"
                />
                <input
                  type="file"
                  id="image"
                  className="file-input file-input-bordered w-full"
                  onChange={handleImgChange}
                />
              </div>
              <div className="w-full">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="input input-bordered w-full mt-2"
                  {...register("email")}
                />
              </div>
              <div className="w-full">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="input input-bordered w-full mt-2"
                  {...register("password")}
                />
              </div>
              <div className="w-full">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Số điện thoại"
                  className="input input-bordered w-full mt-2"
                  {...register("phone")}
                />
              </div>
              <div className="w-full">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Địa chỉ"
                  className="input input-bordered w-full mt-2"
                  {...register("address")}
                />
              </div>
              <div className="mt-6">
                <Button
                  children="Cập nhật tài khoản"
                  className="bg-mainDark text-white text-center rounded-2xl w-full py-2"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
