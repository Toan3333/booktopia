const orderModel = require("./order.model");

module.exports = { create, getAll, updateOrderStatus, updateOrderInfo, cancelOrder };

async function getAll() {
  try {
    const result = await orderModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi lấy danh sách đơn hàng", error);
    throw error;
  }
}

async function create(req, res) {
  try {
    const {
      name,
      phone,
      address,
      email,
      description,
      date,
      total,
      listProducts,
    } = req.body;

    const dateObject = new Date();
    const day = ('0' + dateObject.getDate()).slice(-2);
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    const year = dateObject.getFullYear();
    const datePart = `${day}${month}${year}`; 

    const prefix = "BT"; 
    const uniqueId = Math.random().toString(36).substr(2, 5).toUpperCase();
    const orderId = `${prefix}${datePart}${uniqueId}`; 

    const newOrder = new orderModel({
      orderId,
      name,
      phone,
      address,
      email,
      description,
      date, 
      total,
      listProducts,
    });

    const result = await newOrder.save();

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo đơn hàng",
      error: error.message,
    });
  }
}


async function updateOrderStatus(id, status) {
  const order = await orderModel.findById(id);
  if (!order) throw new Error('Đơn hàng không tồn tại');

  order.status = status;
  order.updatedAt = Date.now();

  return await order.save();
}

// Chỉnh sửa thông tin đơn hàng
async function updateOrderInfo(id, updateData) {
  try {
    const order = await orderModel.findById(id);
    if (!order) throw new Error('Đơn hàng không tồn tại');

    Object.assign(order, updateData);
    order.updatedAt = Date.now();

    return await order.save();
  } catch (error) {
    throw new Error('Lỗi khi chỉnh sửa thông tin đơn hàng: ' + error.message);
  }
}

// Hủy đơn hàng
async function cancelOrder(id) {
  try {
    const order = await orderModel.findById(id);
    if (!order) throw new Error('Đơn hàng không tồn tại');

    if (order.status === 'Đã gửi' || order.status === 'Hoàn thành') {
      throw new Error('Đơn hàng đã được gửi hoặc hoàn thành và không thể xóa');
    }

    if (order.status !== 'Chờ xử lý' && order.status !== 'Đã xử lý') {
      throw new Error('Đơn hàng không thể xóa vì trạng thái không hợp lệ');
    }

    // Xóa đơn hàng
    await orderModel.deleteOne({ _id: id });

    return { message: 'Đơn hàng đã được xóa thành công' };
  } catch (error) {
    throw new Error('Lỗi khi xóa đơn hàng: ' + error.message);
  }
}
