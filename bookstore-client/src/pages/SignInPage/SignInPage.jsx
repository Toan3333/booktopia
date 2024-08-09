import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {
  // Định nghĩa schema validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  // Khởi tạo react-hook-form với schema validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Hàm xử lý submit
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/users/login", data);
      const userData = res.data;
      // Lưu thông tin user vào cookie
      Cookies.set("user", JSON.stringify(userData), { expires: 1 });
      toast.success("Đăng nhập thành công");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorData = error.response.data;
        if (errorData.message === "Email hoặc mật khẩu không đúng") {
          setError("email", { message: "Email hoặc mật khẩu không đúng" });
          toast.error("Email hoặc mật khẩu không đúng");
        } else {
          setError("general", {
            message: errorData.message || "Đăng nhập thất bại",
          });
          toast.error(errorData.message || "Đăng nhập thất bại");
        }
      } else {
        setError("general", { message: "Đăng nhập thất bại" });
        toast.error("Đăng nhập thất bại");
      }
    }
  };

  return (
    <div className="py-10">
      <ToastContainer autoClose={1000} />
      <div className="container">
        <div className="flex items-center justify-between gap-16">
          <div className="max-w-[650px] w-full">
            <img
              src="./images/bannersach 1.png"
              className="w-full rounded-[30px]"
              alt=""
            />
          </div>
          <div className="w-full">
            <PageTitle
              title="Đăng nhập"
              className="text-center mb-6"
            ></PageTitle>
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Nhập email"
                  className="input input-bordered w-full"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="text-red mt-1 text-sm">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="w-full">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="input input-bordered w-full"
                  {...register("password")}
                />
                {errors.password && (
                  <div className="text-red mt-1 text-sm">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="text-right text-sm font-normal leading-normal">
                Quên mật khẩu?
              </div>
              <div>
                <Button
                  type="submit"
                  children="ĐĂNG NHẬP"
                  className="w-full"
                  disabled={isSubmitting}
                ></Button>
                {errors.general && (
                  <p className="my-3 text-danger">{errors.general.message}</p>
                )}
              </div>
              <div className="text-center">Hoặc đăng nhập bằng</div>
              <div className="flex items-center gap-5">
                <div className="bg-blue w-full rounded-[10px] py-4 px-10 text-white h-10 flex items-center gap-2 justify-center cursor-pointer">
                  <FaFacebookF className="w-5 h-5"></FaFacebookF>
                  Facebook
                </div>
                <div className="bg-btnGoogle w-full rounded-[10px] py-3 px-10 text-white h-10 flex items-center gap-2 justify-center cursor-pointer">
                  <FaGooglePlusG className="w-5 h-5"></FaGooglePlusG>
                  Google
                </div>
              </div>
            </form>
            <div className="text-center mt-7 font-medium">
              Nếu bạn chưa có tài khoản, đăng ký{" "}
              <Link to="/sign-up" className="text-red">
                tại đây
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
