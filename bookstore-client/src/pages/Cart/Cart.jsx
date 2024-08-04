import React, { useMemo } from "react";
import Swal from "sweetalert2";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity, removeFromCart, clearCart } from "../../redux/slices/cartslide"; // Đảm bảo đường dẫn đúng

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
    <div className="py-10 screen">
      <div className="container px-4">
        <nav className="mb-5">
          <a href="#" className="text-gray-500">
            Trang chủ
          </a>
          <span className="text-gray-500"> / </span>
          <a href="#" className="text-mainDark font-semibold leading-normal">
            Giỏ hàng
          </a>
        </nav>
        <div className="flex justify-between gap-11">
          <div className="max-w-[800px] w-full">
            {hasItems ? (
              <div>
                <table className="w-full table bg-white rounded-lg">
                  <thead className="border rounded-lg text-[16px] text-text font-semibold">
                    <tr>
                      <th className="text-left py-4 px-5 text-gray-700">Thông tin sản phẩm</th>
                      <th className="py-4 px-5 text-gray-700 text-center">Đơn giá</th>
                      <th className="py-4 px-5 text-gray-700 text-center">Số lượng</th>
                      <th className="py-4 px-5 text-gray-700 text-center">Thành tiền</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={item._id}>
                        <td className="flex items-center gap-3 py-6 cursor-pointer">
                          <img
                            onClick={() => navigate(`/product-detail/${item._id}`)}
                            src={`http://localhost:3000/images/${item.image1}`}
                            className="w-[100px] h-[100px] rounded-lg cursor-pointer"
                            alt="Product"
                          />
                          <div>
                            <h3 className="font-semibold leading-normal text-text">{item?.name}</h3>
                            <div className="">Tác giả: {item.author?.authorName || "Chưa có"}</div>
                            <div className="text-gray-500">{item.category?.categoryName}</div>
                          </div>
                        </td>
                        <td className="py-4 px-5 text-gray-700 text-center">
                          {item.price2.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td className="py-4 px-5">
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
                        <td className="py-4 px-5 text-gray-700 text-center">
                          {(item.price2 * item.quantity).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td className="py-4 px-5 text-mainDark">
                          <FaRegTrashAlt
                            className="w-8 h-8 cursor-pointer"
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
                      <Button className="rounded-[5px] bg-white button-add">
                        Tiếp tục mua hàng
                      </Button>
                    </div>
                    <div>
                      <Button
                        className="rounded-[5px] bg-white button-add"
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
          <div className="w-full max-w-[420px]">
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
    </div>
  );
};

export default Cart;
