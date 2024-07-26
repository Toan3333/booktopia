import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { Link } from "react-router-dom";
const SignInPage = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="flex items-center justify-between gap-16">
          <div className="max-w-[650px] w-full">
            <img src="./images/bannersach 1.png" className="w-full rounded-[30px]" alt="" />
          </div>
          <div className="w-full">
            <PageTitle title="Đăng nhập" className="text-center mb-6"></PageTitle>
            <form action="" className="flex flex-col gap-6">
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Nhập email"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="w-full">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="text-right text-sm font-normal leading-normal">Quên mật khẩu?</div>
              <div>
                <Button children="ĐĂNG NHẬP" className="w-full"></Button>
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
