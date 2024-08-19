var express = require("express");
var router = express.Router();
const orderController = require("../mongo/order.controller");

router.get("/", async (req, res) => {
  try {
    const result = await orderController.getAll();
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lấy danh sách đơn hàng không thành công", error);
    res.status(500).json({ mess: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await orderController.create(req, res);
    return res.status(201).json(result);
  } catch (error) {
    console.log("Tạo đơn hàng không thành công", error);
    res.status(500).json({ message: "Lỗi khi tạo đơn hàng", error: error.message });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedOrder = await orderController.updateOrderStatus(id, status);
    return res.status(200).json({ updatedOrder });
  } catch (error) {
    console.log('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    return res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedOrder = await orderController.updateOrderInfo(id, body);
    return res.status(200).json({ updatedOrder });
  } catch (error) {
    console.log('Lỗi khi chỉnh sửa thông tin đơn hàng:', error);
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const canceledOrder = await orderController.cancelOrder(id);
    return res.status(200).json({ canceledOrder });
  } catch (error) {
    console.log('Lỗi khi hủy đơn hàng:', error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
