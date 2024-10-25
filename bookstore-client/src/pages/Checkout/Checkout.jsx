import React, { useEffect, useMemo, useState } from "react";
import "../../index.css";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { URL_API } from "../../constants/constants";
import axios from "axios";
import { clearCart } from "../../redux/slices/cartslide";


const Checkout = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const listProducts = useSelector((state) => state.cart?.items) || [];
  const total = useMemo(
    () => listProducts.reduce((total, item) => total + item.price2 * item.quantity, 0),
    [listProducts]
  );

  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setData(response.data);
        setCities(response.data.map((city) => city.Name));
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    fetchData();
  }, []);

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
      const user = Cookies.get("user");
      let userId = null;
      if (user) {
        const userData = JSON.parse(user);
        userId = userData.user._id;
      }
      const response = await fetch(`${URL_API}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          listProducts,
          total,
          userId,
          address: `${data.address}, ${selectedWard}, ${selectedDistrict}, ${selectedCity}`,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Order created successfully", result);
        dispatch(clearCart());
        reset()
      } else {
        console.error("Error creating order", result);
      }
    } catch (error) {
      console.error("Error creating order", error);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedWard("");
  };

  const getDistricts = () => data.find((city) => city.Name === selectedCity)?.Districts || [];
  const getWards = () =>
    getDistricts().find((district) => district.Name === selectedDistrict)?.Wards || [];

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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex justify-between gap-20 max-md:flex-col max-md:w-full">
            <div className="w-[55%] mt-6 max-md:w-full">
              <h3 className="text-text font-semibold leading-normal mb-2">Thông tin giao hàng</h3>
              <div className="flex flex-col gap-6">
                {/* Thông tin cá nhân */}
                <div>
                  <input
                    {...register("name", { required: "Họ tên là bắt buộc" })}
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
                      pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" },
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
                    {...register("phone", { required: "Số điện thoại là bắt buộc" })}
                    id="userPhoneNumber"
                    className="input input-bordered w-full"
                    type="text"
                    placeholder="Nhập số điện thoại"
                  />
                  {errors.phone && <div className="errform">{errors.phone.message}</div>}
                </div>
                <div>
                  <input
                    {...register("address", { required: "Địa chỉ là bắt buộc" })}
                    id="userAddress"
                    className="input input-bordered w-full"
                    type="text"
                    placeholder="Nhập địa chỉ"
                  />
                  {errors.address && <div className="errform">{errors.address.message}</div>}
                </div>

                {/* Dropdown cho địa chỉ */}
                <div>
                  <label htmlFor="city" className="block mb-2">
                    Chọn Thành Phố:
                  </label>
                  <select
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="input input-bordered w-full">
                    <option value="">-- Chọn Thành Phố --</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCity && (
                  <div>
                    <label className="block mb-2">Chọn Quận Huyện:</label>
                    <select
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      className="input input-bordered w-full">
                      <option value="">-- Chọn Quận Huyện --</option>
                      {getDistricts().map((district) => (
                        <option key={district.Id} value={district.Name}>
                          {district.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedDistrict && (
                  <div>
                    <label className="block mb-2">Chọn Phường Xã:</label>
                    <select
                      value={selectedWard}
                      onChange={(e) => setSelectedWard(e.target.value)}
                      className="input input-bordered w-full">
                      <option value="">-- Chọn Phường Xã --</option>
                      {getWards().map((ward) => (
                        <option key={ward.Id} value={ward.Name}>
                          {ward.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Phương thức vận chuyển */}
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
              </div>

              {/* Phương thức thanh toán */}
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

            {/* Đơn hàng */}
            <div className="w-[45%] max-md:w-full">
              <div className="rounded-[5px] border py-8 px-7">
                <h2 className="text-lg font-semibold mb-5">Đơn hàng</h2>
                {listProducts.map((item) => (
                  <div className="mb-5" key={item._id}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-32 relative">
                          <img
                            src={`${URL_API}/images/${item.image1}`}
                            className="w-full h-full cursor-pointer object-cover"
                            alt=""
                          />
                          <div className="absolute flex items-center justify-center -top-2 -right-2 w-5 h-5 rounded-full bg-mainDark text-white">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 max-w-[250px] max-md:max-w-[220px]">
                          <h4 className="font-semibold text-sm leading-normal line-clamp-3">
                            {item.name}
                          </h4>
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
                        className="rounded-[5px] px-5 py-4 w-full max-md:px-2 max-md:py-3 max-md:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="pb-7 border-b">
                  <div className="flex justify-between my-5">
                    <span className="text-text font-normal leading-normal">Tạm tính:</span>
                    <span className="text-text font-normal leading-normal">
                      {total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
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
                  <Button className="rounded-[5px] bg-white button-add max-md:py-2 max-md:px-5 max-md:text-sm">
                    Tiếp tục mua hàng
                  </Button>
                </div>
                <div className="w-1/2">
                  <Button
                    className="w-full rounded-[5px] max-md:text-sm max-md:py-2 max-md:px-5"
                    type="submit">
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
