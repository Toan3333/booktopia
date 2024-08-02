import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBook, FaClipboardList, FaRegEdit, FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AiFillDashboard, AiOutlineBars } from "react-icons/ai";
import "../DashBoard.css";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import HeaderAdmin from "../../../../components/HeaderAdmin/HeaderAdmin";
import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const EditBlog = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getBlogById = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blog/${id}`);
        const { name, date, image, content } = response.data;
        setValue("name", name);
        setValue("date", date.substring(0, 10)); // Chuyển đổi định dạng ngày nếu cần
        setValue("content", content);
        setSelectedImage(`http://localhost:3000/images/${image}`);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogById();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("date", data.date);
      formData.append("content", data.content);
      if (data.image[0]) {
        formData.append("image", data.image[0]); // Chỉ gửi nếu có hình ảnh mới
      }

      const response = await axios.put(`http://localhost:3000/blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Bài viết đã được cập nhật thành công!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard/manage-blog");
    } catch (error) {
      console.error("Error updating blog:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Có lỗi xảy ra!",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <div className="flex min-h-screen border">
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
        <div className="flex-1 p-6">
          <HeaderAdmin />
          <div className="flex items-center justify-between pb-8 border-b">
            <PageTitle title="Cập nhật bài viết" className="text-mainDark" />
          </div>
          <div className="border rounded-[10px] py-8 px-5 mt-7">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="name">*Tên bài viết</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  id="name"
                  className="input input-bordered w-full"
                />
                {errors.name && <p className="text-red-500">Tên bài viết là bắt buộc</p>}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="date">*Ngày viết</label>
                <input
                  type="date"
                  {...register("date", { required: true })}
                  id="date"
                  className="input input-bordered w-full"
                />
                {errors.date && <p className="text-red-500">Ngày viết là bắt buộc</p>}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="image">*Hình ảnh</label>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="mt-2 max-h-32 w-40 object-cover"
                  />
                )}
                <input
                  type="file"
                  {...register("image")}
                  id="image"
                  className="file-input file-input-bordered w-full"
                  onChange={handleImageChange}
                />
                {errors.image && <p className="text-red-500">Hình ảnh là bắt buộc</p>}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="content">Nội dung</label>
                <textarea
                  {...register("content", { required: true })}
                  id="content"
                  className="input input-bordered w-full h-32"
                />
                {errors.content && <p className="text-red-500">Nội dung là bắt buộc</p>}
              </div>
              <div className="flex items-center gap-3">
                <Button>Lưu</Button>
                <Button className="bg-secondary">Hủy</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
