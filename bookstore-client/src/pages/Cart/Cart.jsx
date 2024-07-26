import React from "react";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const Cart = ({ items = [] }) => {
  // Kiểm tra xem giỏ hàng có sản phẩm không
  const hasItems = items.length > 0;

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
              <div className="">
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
                    <tr>
                      <td className="flex items-center gap-3 py-6">
                        <img
                          src="./images/sach1 1.png"
                          className="w-[100px] h-[100px] rounded-lg"
                          alt="Product"
                        />
                        <div>
                          <h3 className="font-semibold leading-normal text-text">
                            Đám trẻ ở đại dương đen
                          </h3>
                          <div className="">Tác giả:</div>
                          <div className="text-gray-500">Tiểu thuyết</div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-gray-700 text-center">79.000đ</td>
                      <td className="py-4 px-5">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button className="px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                              <FaMinus />
                            </button>
                            <input
                              type="text"
                              className="w-8 text-center border-0 focus:ring-0"
                              defaultValue="1"
                            />
                            <button className="px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-gray-700 text-center">79.000đ</td>
                      <td className="py-4 px-5 text-mainDark">
                        <FaRegTrashAlt className="w-5 h-5 cursor-pointer"></FaRegTrashAlt>
                      </td>
                    </tr>
                    <tr>
                      <td className="flex items-center gap-3 py-6">
                        <img
                          src="./images/sach1 1.png"
                          className="w-[100px] h-[100px] rounded-lg"
                          alt="Product"
                        />
                        <div>
                          <h3 className="font-semibold leading-normal text-text">
                            Đám trẻ ở đại dương đen
                          </h3>
                          <div className="">Tác giả:</div>
                          <div className="text-gray-500">Tiểu thuyết</div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-gray-700 text-center">79.000đ</td>
                      <td className="py-4 px-5">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button className="px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                              <FaMinus />
                            </button>
                            <input
                              type="text"
                              className="w-8 text-center border-0 focus:ring-0"
                              defaultValue="1"
                            />
                            <button className="px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-gray-700 text-center">79.000đ</td>
                      <td className="py-4 px-5 text-mainDark">
                        <FaRegTrashAlt className="w-5 h-5 cursor-pointer"></FaRegTrashAlt>
                      </td>
                    </tr>
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
                      <Button className="rounded-[5px] bg-white button-add">Xóa tất cả</Button>
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
                <span className="text-mainDark font-semibold leading-normal">221.400đ</span>
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
                <span>79.000đ</span>
              </div>
              <Button className="w-full rounded-[5px] mt-5">
                <Link to="/checkout">Thanh toán</Link>
              </Button>
              <div className="text-center my-5">Hỗ trợ thanh toán với</div>
              <div className="flex items-center justify-center gap-5">
                <img src="./images/visa.png" alt="" />
                <img src="./images/napas.png" alt="" />
                <img src="./images/momo.png" alt="" />
                <img src="./images/zalopay.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
