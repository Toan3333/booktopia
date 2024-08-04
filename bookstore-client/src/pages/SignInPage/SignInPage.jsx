import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

const SignInPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu"),
    }),

    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 400 && errorData.message === "Email hoặc mật khẩu không đúng") {
            setFieldError("email", "Email hoặc mật khẩu không đúng");
          } else {
            throw new Error(errorData.message || "Đăng nhập thất bại");
          }
        }
        alert("Đăng nhập thành công");
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
            <img src="./images/bannersach 1.png" className="w-full rounded-[30px]" alt="" />
          </div>
          <div className="w-full">
            <PageTitle title="Đăng nhập" className="text-center mb-6"></PageTitle>
            <form action="" className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Nhập email"
                  className="input input-bordered w-full"
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
              <div className="text-right text-sm font-normal leading-normal">Quên mật khẩu?</div>
              <div>
                <Button type="submit" children="ĐĂNG NHẬP" className="w-full" disabled={formik.isSubmitting}></Button>
                {formik.errors.general && (
                  <p className="my-3 text-danger">{formik.errors.general}</p>
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
