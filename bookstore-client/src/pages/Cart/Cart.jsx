import React, { useMemo } from "react";
import Swal from "sweetalert2";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity, removeFromCart, clearCart } from "../../redux/slices/cartslide"; // Đảm bảo đường dẫn đúng
import { URL_API } from "../../constants/constants";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart?.items) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = useMemo(
    () => cartItems.reduce((total, item) => total + item.price2 * item.quantity, 0),
    [cartItems]
  );

  const handleIncreaseQuantity = (itemId) => {
    dispatch(updateCartItemQuantity({ id: itemId, quantity: 1 }));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(updateCartItemQuantity({ id: itemId, quantity: -1 }));
  };

  const handleRemoveItem = (itemId) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#166534",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, xóa nó!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(itemId));
        Swal.fire({
          title: "Đã xóa!",
          text: "Sản phẩm đã được xóa khỏi giỏ hàng.",
          icon: "success",
        });
      }
    });
  };

  const handleClearItem = () => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#166534",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, xóa nó!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        Swal.fire({
          title: "Đã xóa tất cả!",
          text: "Sản phẩm đã được xóa khỏi giỏ hàng.",
          icon: "success",
        });
      }
    });
  };

  const hasItems = cartItems.length > 0;

  return (
    <div className="py-10 max-md:py-0 screen">
      <div className="container px-4">
        <nav className="mb-5 py-3">
          <a href="#" className="text-gray-500">
            Trang chủ
          </a>
          <span className="text-gray-500"> / </span>
          <a href="#" className="text-mainDark font-semibold leading-normal">
            Giỏ hàng
          </a>
        </nav>
        <div className="flex justify-between gap-11 max-lg:flex-col max-xl:flex-col">
          <div className="max-w-[800px] w-full max-xl:max-w-[100%]">
            {hasItems ? (
              <div>
                <table className="w-full table bg-white rounded-lg">
                  <thead className="border rounded-lg text-[16px] text-text font-semibold max-md:hidden">
                    <tr>
                      <th className="text-left py-4 px-5 text-gray-700 max-md:hidden">
                        Thông tin sản phẩm
                      </th>
                      <th className="py-4 px-5 text-gray-700 text-center max-md:hidden">Đơn giá</th>
                      <th className="py-4 px-5 text-gray-700 text-center max-md:hidden">
                        Số lượng
                      </th>
                      <th className="py-4 px-5 text-gray-700 text-center">Thành tiền</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={item._id}>
                        <td className="flex items-center gap-3 py-6 cursor-pointer max-md:gap-2 max-md:py-3">
                          <img
                            onClick={() => navigate(`/product-detail/${item._id}`)}
                            src={`${URL_API}/images/${item.image1}`}
                            className="w-[100px] h-[100px] rounded-lg cursor-pointer"
                            alt="Product"
                          />
                          <div>
                            <h3 className="font-semibold leading-normal text-text max-md:leading-4 max-md:line-clamp-2">
                              {item?.name}
                            </h3>
                            <div className="text-gray-700 2xl:hidden max-2xl:hidden max-md:block">
                              {item.price2.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </div>
                            <div className="max-md:block max-2xl:hidden mt-2">
                              <div className="flex">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                  <button
                                    className="px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                    onClick={() => handleDecreaseQuantity(item._id)}
                                    disabled={item.quantity <= 1}>
                                    <FaMinus />
                                  </button>
                                  <input
                                    type="text"
                                    className="w-8 text-center border-0 focus:ring-0"
                                    value={item.quantity}
                                    readOnly
                                  />
                                  <button
                                    className="px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                    onClick={() => handleIncreaseQuantity(item._id)}>
                                    <FaPlus />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="max-md:hidden my-1">
                              Tác giả: {item.author?.authorName || "Chưa có"}
                            </div>
                            <div className="text-gray-500 max-md:hidden">
                              {item.category?.categoryName}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5 text-gray-700 text-center max-md:hidden">
                          {item.price2.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td className="py-4 px-5 max-md:hidden">
                          <div className="flex items-center justify-center">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                className="px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                onClick={() => handleDecreaseQuantity(item._id)}
                                disabled={item.quantity <= 1}>
                                <FaMinus />
                              </button>
                              <input
                                type="text"
                                className="w-8 text-center border-0 focus:ring-0"
                                value={item.quantity}
                                readOnly
                              />
                              <button
                                className="px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                onClick={() => handleIncreaseQuantity(item._id)}>
                                <FaPlus />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5 text-gray-700 text-center max-md:hidden">
                          {(item.price2 * item.quantity).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td className="py-4 px-5 text-mainDark">
                          <FaRegTrashAlt
                            className="w-6 h-6 cursor-pointer max-md:w-10 max-md:h-10"
                            onClick={() => handleRemoveItem(item._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="border-t">
                  <div className="pt-8 flex items-center justify-between">
                    <div>
                      <Button className="rounded-[5px] bg-white button-add max-md:hidden max-lg:h-10">
                        Tiếp tục mua hàng
                      </Button>
                    </div>
                    <div>
                      <Button
                        className="rounded-[5px] bg-white button-add max-md:hidden max-lg:h-10"
                        onClick={handleClearItem}>
                        Xóa tất cả
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-lg font-semibold">Giỏ hàng của bạn đang trống!</p>
                <img src="./images/empty-cart.png" alt="Empty Cart" className="mx-auto mt-4" />
                <Button className="mt-4">
                  <Link to="/">Quay lại trang chủ</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="w-full max-w-[420px] max-md:hidden max-lg:max-w-[100%] max-xl:max-w-[100%]">
            <div className="bg-white rounded-lg border p-5">
              <h2 className="text-lg font-semibold mb-5 text-center border-b pb-5">
                Thông tin đơn hàng
              </h2>
              <div className="flex justify-between mb-3 border-b pb-5">
                <span className="text-text font-normal leading-normal">Tổng tiền:</span>
                <span className="text-mainDark font-semibold leading-normal">
                  {total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="flex justify-between my-5">
                <span className="text-text font-normal leading-normal">Giảm giá</span>
                <span className="text-text font-normal leading-normal">
                  Áp dụng tại trang thanh toán
                </span>
              </div>
              <div className="flex justify-between my-5">
                <span className="text-text font-normal leading-normal">Phí vận chuyển:</span>
                <span className="text-text font-normal leading-normal">Miễn phí</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mb-3">
                <span>Tổng cộng:</span>
                <span>
                  {total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <Button className="w-full rounded-[5px] mt-5">
                <Link to="/checkout">Thanh toán</Link>
              </Button>
              <div className="text-center my-5">Hỗ trợ thanh toán với</div>
              <div className="flex items-center justify-center gap-5">
                <img src="./images/visa.png" alt="Visa" />
                <img src="./images/napas.png" alt="Napas" />
                <img src="./images/momo.png" alt="Momo" />
                <img src="./images/zalopay.png" alt="ZaloPay" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden max-md:block">
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md p-4 flex justify-between items-center z-50 max-md:flex">
          <div className="flex flex-col">
            <div>Tổng cộng</div>
            <span className="text-lg font-semibold text-mainDark">
              {total.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <Button className="rounded-lg bg-green-600 text-white px-4 py-2">
            <Link to="/checkout">Thanh toán</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
