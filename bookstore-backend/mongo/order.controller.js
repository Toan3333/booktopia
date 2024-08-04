const orderModel = require("./order.model");

module.exports = { create };

async function create(req, res) {
  try {
    const { orderId, name, phone, address, email, description, date, total, listProducts } =
      req.body;

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
    // Xử lý lỗi
    res.status(500).json({
      message: "Lỗi khi tạo đơn hàng",
      error: error.message,
    });
  }
}
