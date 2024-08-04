import React from "react";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import * as Yup from "yup";
import { useFormik } from "formik";

const SignUpPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "", 
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("vui lòng nhập email"),
      name: Yup.string()
        .min(2, "Họ và tên ít nhất 2 kí tự!")
        .required("vui lòng nhập tên người dùng"),
      username: Yup.string()
        .min(2, "Tên người dùng ít nhất 2 kí tự!")
        .required("vui lòng nhập tên người dùng"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số"
        )
        .required("Vui lòng nhập mật khẩu"),
      confirm_password: Yup.string() 
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
        .required("Vui lòng nhập lại password"),
    }),

    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
          }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 400 && errorData.message === "Email đã tồn tại") {
            setFieldError("email", "Email đã tồn tại");
          } else {
            throw new Error(errorData.message || "Đăng ký thất bại");
          }
        }
        alert("Đăng ký thành công");
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="py-10">
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
            <PageTitle title="Đăng Ký" className="text-center mb-6"></PageTitle>
            <form
              action=""
              className="flex flex-col gap-6"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="input input-bordered w-full"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-danger">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Tên tài khoản"
                  className="input input-bordered w-full"
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-danger">{formik.errors.username}</div>
                ) : null}
              </div>
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Nhập email"
                  className="input rounded-[10px] input-bordered w-full"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="w-full">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="input input-bordered w-full"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="w-full">
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="input input-bordered w-full"
                  {...formik.getFieldProps("confirm_password")}
                />
                {formik.touched.confirm_password &&
                formik.errors.confirm_password ? (
                  <div className="text-danger">
                    {formik.errors.confirm_password}
                  </div>
                ) : null}
              </div>
              <div className="text-right text-sm font-normal leading-normal">
                Quên mật khẩu?
              </div>
              <div>
                <Button
                  type="submit"
                  children="ĐĂNG KÝ"
                  className="w-full"
                  disabled={formik.isSubmitting}
                ></Button>
                {formik.errors.general && (
                  <p className="my-3 text-danger">{formik.errors.general}</p>
                )}
              </div>
              <div className="text-center">Hoặc đăng nhập bằng</div>
              <div className="flex items-center gap-5">
                <div className="bg-blue w-full rounded-[10px] py-3 px-10 text-white h-10 flex items-center gap-2 justify-center cursor-pointer">
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
              Nếu bạn đã có tài khoản, đăng nhập
              <Link to="/sign-in" className="text-red">
                tại đây
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
