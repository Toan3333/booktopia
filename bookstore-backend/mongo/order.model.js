const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
  orderId: { type: String, require: true },
  name: { type: String, require: true },
  phone: { type: String, require: true },
  address: { type: String, require: true },
  email: { type: String, require: true },
  description: { type: String, require: false, default: null },
  date: { type: Date, default: Date.now },
  total: { type: String, require: true },
  listProducts: [
    {
      name: { type: String, required: true },
      author: { type: String, required: true },
      image1: { type: String, required: false },
      price2: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Chờ xử lý', 'Đang xử lý', 'Đã gửi', 'Đã giao', 'Đã hủy'], default: 'Chờ xử lý' },
});

module.exports = mongoose.models.order || mongoose.model("orders", orderSchema);
