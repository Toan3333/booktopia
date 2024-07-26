import React from "react";
import "../../index.css";
import OrderList from "../../components/Order/OrderList";
import Button from "../../components/Button/Button";
const Checkout = () => {
  return (
    <div className="py-10">
      <div className="container">
        <nav className="mb-5">
          <a href="#" className="text-gray-500">
            Trang chủ
          </a>
          <span className="text-gray-500"> / </span>
          <a href="#" className="text-mainDark font-semibold leading-normal">
            Thanh toán
          </a>
        </nav>
        <div className="flex justify-between gap-20">
          <div className="w-[55%] mt-6">
            <h3 className="text-text font-semibold leading-normal mb-2">Thông tin giao hàng</h3>
            <form action="" className="flex flex-col gap-6">
              <div>
                <input type="email" placeholder="Email" className="input input-bordered w-full" />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <input type="text" placeholder="Địa chỉ" className="input input-bordered w-full" />
              </div>
            </form>
            <div className="mt-5">
              <h3 className="text-text font-semibold leading-normal mb-4">
                Phương thức vận chuyển
              </h3>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-3">
                  <label htmlFor="giaohang" className="checkbox-style">
                    <input
                      type="checkbox"
                      name="giaohang"
                      id="giaohang"
                      className="checkbox-input"
                    />
                    <div className="checkbox-box"></div>
                  </label>
                  <div className="">Giao hàng tiêu chuẩn (từ 3 đến 5 ngày)</div>
                </div>
                <div className="ml-10">30.000đ</div>
              </div>

              {/* Additional shipping method options can be added similarly */}
            </div>
            <div className="mt-5">
              <h3 className="text-text font-semibold leading-normal mb-4">
                Phương thức thanh toán
              </h3>
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <label htmlFor="tructiep" className="checkbox-style">
                      <input
                        type="checkbox"
                        name="tructiep"
                        id="tructiep"
                        className="checkbox-input"
                      />
                      <div className="checkbox-box"></div>
                    </label>
                    <div className="">Thanh toán trực tiếp khi nhận hàng</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label htmlFor="tructiep" className="checkbox-style">
                      <input
                        type="checkbox"
                        name="tructiep"
                        id="tructiep"
                        className="checkbox-input"
                      />
                      <div className="checkbox-box"></div>
                    </label>
                    <div className="">Thanh toán bằng</div>
                  </div>
                </div>
              </div>

              {/* Additional shipping method options can be added similarly */}
            </div>
          </div>
          <div className="w-[45%]">
            <div className="rounded-[5px] border py-8 px-7">
              <h2 className="text-lg font-semibold mb-5">Đơn hàng</h2>
              <OrderList></OrderList>
              <div className="border-t">
                <div className="flex items-center justify-between gap-3 mt-7 pb-7 border-b">
                  <div className="w-[70%]">
                    <input
                      type="text"
                      placeholder="Mã giảm giá"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="w-[30%]">
                    <Button children="Sử dụng" className="rounded-[5px] px-5 py-4 w-full"></Button>
                  </div>
                </div>
              </div>
              <div className="pb-7 border-b">
                <div className="flex justify-between my-5">
                  <span className="text-text font-normal leading-normal">Tạm tính:</span>
                  <span className="text-text font-normal leading-normal">221.400đ</span>
                </div>
                <div className="flex justify-between text-text font-normal leading-normal">
                  <span>Phí vận chuyển:</span>
                  <span>30.000đ</span>
                </div>
              </div>
              <div className="flex justify-between text-text font-normal leading-normal mt-10">
                <span>Tổng cộng:</span>
                <span className="text-mainDark font-semibold leading-normal">79.000đ</span>
              </div>
            </div>
            <div className="flex items-center mt-7">
              <div className="w-1/2">
                <Button className="rounded-[5px] bg-white button-add">Tiếp tục mua hàng</Button>
              </div>
              <div className="w-1/2">
                <Button className="w-full rounded-[5px]">Đặt hàng</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
