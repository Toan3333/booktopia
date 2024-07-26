import React from "react";

import { FaCreditCard, FaHeadphonesAlt, FaShippingFast } from "react-icons/fa";

import { FaBoxOpen } from "react-icons/fa6";
const Service = () => {
  return (
    <div>
      <div className="py-10 border-t">
        <div className="container">
          <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-2">
            <div className="flex items-center gap-3 max-lg:justify-center max-sm:flex-col max-sm:justify-center max-sm::items-center">
              <FaShippingFast className="text-main w-12 h-12"></FaShippingFast>
              <div className="flex flex-col">
                <div className="font-semibold leading-normal max-sm:text-center max-sm:text-sm">
                  Miễn phí vận chuyển
                </div>
                <div className="font-normal text-sm leading-normal text-grayText max-sm:text-center">
                  Cho đơn từ 299K{" "}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 max-lg:justify-center max-sm:flex-col max-sm:justify-center max-sm::items-center max-sm:text-center">
              <FaBoxOpen className="text-main w-12 h-12"></FaBoxOpen>
              <div className="flex flex-col">
                <div className="font-semibold leading-normal max-sm:text-sm">Đổi hàng tận nhà</div>
                <div className="font-normal text-sm leading-normal text-grayText">
                  Trong vòng 7 ngày
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 max-lg:justify-center max-sm:flex-col max-sm:justify-center max-sm::items-center max-sm:text-center">
              <FaCreditCard className="text-main w-12 h-12"></FaCreditCard>
              <div className="flex flex-col">
                <div className="font-semibold leading-normal max-sm:text-sm">Thanh toán COD</div>
                <div className="font-normal text-sm leading-normal text-grayText">
                  Đa dạng hình thức thanh toán
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 max-lg:justify-center max-sm:flex-col max-sm:justify-center max-sm::items-center max-sm:text-center">
              <FaHeadphonesAlt className="text-main w-12 h-12"></FaHeadphonesAlt>
              <div className="flex flex-col">
                <div className="font-semibold leading-normal max-sm:text-sm">Tư vấn miễn phí</div>
                <div className="font-normal text-sm leading-normal text-grayText">
                  Hỗ trợ tư vấn 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
