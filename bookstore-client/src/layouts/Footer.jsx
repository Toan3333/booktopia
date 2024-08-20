import React from "react";
import "../App.css";
import {
  FaSearchLocation,
  FaPhoneAlt,
  FaGoogle,
  FaFacebookF,
  FaFacebook,
  FaMapMarkerAlt,
  FaClock,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaInstagram, FaRegClock } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CgMail } from "react-icons/cg";

const Footer = () => {
  return (
    <div className="pb-5">
      <div className="py-10 border">
        <div className="container">
          <div className="footer-list max-lg:grid-cols-2 max-lg:gap-20 max-md:grid-cols-1 max-md:gap-10">
            <div className="">
              <img
                src="./images/logo.png"
                className="max-w-[220px] w-full object-cover"
                alt="Logo"
              />
              <div className="mt-3 text-grayText mb-5 font-normal leading-normal">
                Bạn có câu hỏi? Liên hệ chúng tôi
              </div>
              <div className="mb-5 font-semibold leading-normal">(+84) 776 831 909</div>
              <ul className="flex items-center gap-4">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-mainDark">
                    <FaFacebook className="w-5 h-5" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-mainDark">
                    <FaInstagram className="w-5 h-5" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-mainDark">
                    <FaTwitter className="w-5 h-5" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-mainDark">
                    <FaYoutube className="w-5 h-5" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="max-lg:">
              <h3 className="font-semibold text-mainDark text-[18px] leading-normal mb-8 max-md:mb-2">
                Thông tin liên hệ
              </h3>
              <ul className="flex flex-col gap-3 text-text max-md:text-sm">
                <li>
                  <a href="#" className="flex gap-2 font-normal">
                    <HiOutlineLocationMarker className="w-6 h-6 max-md:w-5 max-md:h-5" />
                    <div className="leading-normal">Quận 12, Thành phố Hồ Chí Minh</div>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 font-normal">
                    <FaRegClock className="w-5 h-5 max-md:w-5 max-md:h-5" />
                    <div className="leading-normal">
                      Thứ 2 - Thứ 6: 9:00 - 20:00 <br /> Thứ 7: 9:00 - 12:00
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 font-normal">
                    <CgMail className="w-6 h-6 max-md:w-5 max-md:h-5"></CgMail>
                    <div>bansach@gmail.com</div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="">
              <h3 className="font-bold text-mainDark leading-normal mb-8 max-md:mb-2">Dịch vụ</h3>
              <ul className="flex flex-col gap-5 text-text max-md:text-sm max-md:gap-3">
                <li>
                  <a href="#" className="font-normal">
                    Điều khoản sử dụng
                  </a>
                </li>
                <li>
                  <a href="#" className="font-normal">
                    Bảo mật thông tin khách hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="font-normal">
                    Bảo mật thanh toán
                  </a>
                </li>
                <li>
                  <a href="#" className="font-normal">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="font-normal">
                    Hệ thống nhà sách
                  </a>
                </li>
              </ul>
            </div>
            <div className="">
              <h3 className="font-bold text-mainDark leading-normal mb-8 max-md:mb-2">
                Thông tin liên hệ
              </h3>
              <ul className="flex flex-col gap-5 text-text max-md:gap-3 max-md:text-sm">
                <li>
                  <a href="#" className="font-normal">
                    Chính sách bảo hành
                  </a>
                </li>
                <li>
                  <a href="#" className="font-normal">
                    Chính sách đổi - trả - hoàn tiền
                  </a>
                </li>
                <li>
                  <a href="#" className="font-normal">
                    Chính sách vận chuyển
                  </a>
                </li>
                <li>
                  <a href="#" className="font-normal">
                    Chính sách thanh toán
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex justify-between items-center pt-5 font-medium leading-normal max-md:flex-col">
          <div>Copyright © . All rights reserved.</div>
          <div className="flex items-center gap-2 max-md:hidden">
            <img src="./images/card.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
