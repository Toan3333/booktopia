import React, { useEffect, useState } from "react";
import { FaRegEdit, FaUser, FaHeart, FaCalendar } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";

const Profile = () => {
  const profileMenuList = [
    { id: 1, name: "Tài khoản của tôi", icon: <FaUser />, link: "/profile" },
    {
      id: 2,
      name: "Sản phẩm yêu thích",
      icon: <FaHeart />,
      link: "/favorites",
    },
    {
      id: 3,
      name: "Đơn hàng của bạn",
      icon: <FaCalendar />,
      link: "/my-orders",
    },
    { id: 4, name: "Đăng xuất", icon: <FiLogOut />, link: "/logout" },
  ];

  const [user, setUser] = useState({});
  const [image, setImage] = useState(""); // Lưu URL của ảnh
  let userId = Cookies.get("user");
  userId = JSON.parse(userId);

  const { register, handleSubmit, setValue, reset, getValues } = useForm();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/users/${userId.user._id}`
        );
        console.log(res);

        if (res.status === 200) {
          const data = res.data;
          setValue("name", data.name);
          setValue("username", data.username);
          setValue("date", data.date);
          setValue("email", data.email);
          setValue("phone", data.phone);
          setValue("address", data.address);
          setImage(`http://localhost:3000/images/${data.image}`);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    getUser();
  }, [userId, setValue]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("username", data.username);
      formData.append("date", data.date);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await axios.put(
        `http://localhost:3000/users/${userId.user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        console.log("Profile updated successfully");
        reset(res.data);
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
            {/* Thông tin tài khoản */}
            <div className="flex items-center gap-2">
              <img
                src={image}
                className="w-[50px] h-[50px] rounded-full"
                alt="Avatar"
              />
              <div>
                <h3 className="font-semibold leading-normal">
                  {userId.user?.email}
                </h3>
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
                    }
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/5">
            <PageTitle
              title="Cập nhật tài khoản"
              className="text-mainDark mb-2"
            ></PageTitle>
            <div className="text-grayText leading-normal font-normal mb-5">
              Chỉnh sửa thông tin cá nhân, tài khoản và mật khẩu
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
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
                  type="text"
                  id="date"
                  placeholder="dd/mm/yyyy"
                  className="input input-bordered w-full mt-2"
                  {...register("date")}
                />
              </div>
              <div className="w-full">
                <label htmlFor="image">Hình ảnh</label>
                <img
                  src={image}
                  style={{ margin: "0 0 20px 0", maxHeight: "160px" }}
                  alt="Preview"
                />
                <input
                  type="file"
                  id="image"
                  className="input input-bordered h-full py-3 w-full mt-2"
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
              <div>
                <Button
                  type="submit"
                  children="Lưu"
                  className="rounded-[10px]"
                ></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
