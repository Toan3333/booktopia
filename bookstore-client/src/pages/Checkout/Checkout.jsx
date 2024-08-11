import React, { useEffect, useMemo } from "react";
import "../../index.css";
import OrderList from "../../components/Order/OrderList";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const listProducts = useSelector((state) => state.cart?.items) || [];
  const total = useMemo(
    () => listProducts.reduce((total, item) => total + item.price2 * item.quantity, 0),
    [listProducts]
  );

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      const userData = JSON.parse(user);
      setValue("name", userData.user.name);
      setValue("email", userData.user.email);
      setValue("phone", userData.user.phone);
      setValue("address", userData.user.address);
    }
  }, [setValue]);
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          listProducts,
          total,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Order created successfully", result);
      } else {
        console.error("Error creating order", result);
      }
    } catch (error) {
      console.error("Error creating order", error);
    }
  };
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-20">
            <div className="w-[55%] mt-6">
              <h3 className="text-text font-semibold leading-normal mb-2">Thông tin giao hàng</h3>
              <div className="flex flex-col gap-6">
                <div>
                  <input
                    {...register("name", {
                      required: "Họ tên là bắt buộc",
                    })}
                    className="input input-bordered w-full"
                    id="name"
                    type="text"
                    placeholder="Nhập họ tên"
                  />
                  {errors.name && <div className="errform">{errors.name.message}</div>}
                </div>
                <div>
                  <input
                    {...register("email", {
                      required: "Email là bắt buộc",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email không hợp lệ",
                      },
                    })}
                    id="userEmail"
                    className="input input-bordered w-full"
                    type="text"
                    placeholder="Nhập email"
                  />
                  {errors.email && <div className="errform">{errors.email.message}</div>}
                </div>
                <div>
                  <input
                    {...register("phone", {
                      required: "Số điện thoại là bắt buộc",
                    })}
                    id="userPhoneNumber"
                    className="input input-bordered w-full"
                    type="text"
                    placeholder="Nhập số điện thoại"
                  />
                  {errors.phone && <div className="errform">{errors.phone.message}</div>}
                </div>
                <div>
                  <input
                    {...register("address", {
                      required: "Địa chỉ là bắt buộc",
                    })}
                    id="userAddress"
                    className="input input-bordered w-full"
                    type="text"
                    placeholder="Nhập địa chỉ"
                  />
                  {errors.address && <div className="errform">{errors.address.message}</div>}
                </div>
              </div>
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
              </div>
            </div>
            <div className="w-[45%]">
              <div className="rounded-[5px] border py-8 px-7">
                <h2 className="text-lg font-semibold mb-5">Đơn hàng</h2>
                {listProducts.map((item, index) => (
                  <div className="" key={item._id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-28 h-22 relative">
                          <img
                            src={`http://localhost:3000/images/${item.image1}`}
                            className="w-full h-full cursor-pointer"
                            alt=""
                          />
                          <div className="absolute flex items-center justify-center -top-2 right-3 w-5 h-5 rounded-full bg-mainDark text-white">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h4 className="font-semibold text-text leading-normal">{item.name}</h4>
                          <div className="font-normal text-sm text-grayText leading-normal">
                            {item.category.categoryName}
                          </div>
                        </div>
                      </div>
                      <div className="text-text leading-normal font-normal">
                        {item.price2.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {/* <OrderList></OrderList> */}
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
                      <Button
                        children="Sử dụng"
                        className="rounded-[5px] px-5 py-4 w-full"></Button>
                    </div>
                  </div>
                </div>
                <div className="pb-7 border-b">
                  <div className="flex justify-between my-5">
                    <span className="text-text font-normal leading-normal">Tạm tính:</span>
                    <span className="text-text font-normal leading-normal">
                      {total.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-text font-normal leading-normal">
                    <span>Phí vận chuyển:</span>
                    <span>30.000đ</span>
                  </div>
                </div>
                <div className="flex justify-between text-text font-normal leading-normal mt-10">
                  <span>Tổng cộng:</span>
                  <span className="text-mainDark font-semibold leading-normal">
                    {(total + 30000).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center mt-7">
                <div className="w-1/2">
                  <Button className="rounded-[5px] bg-white button-add">Tiếp tục mua hàng</Button>
                </div>
                <div className="w-1/2">
                  <Button className="w-full rounded-[5px]" type="submit">
                    Đặt hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
