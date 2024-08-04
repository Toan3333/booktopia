var express = require("express");
var router = express.Router();
const orderController = require("../mongo/order.controller");

router.post('/', async (req, res) => {
    try {
        const result = await orderController.create(req, res);
        return res.status(201).json(result);
    } catch (error) {
        console.log('Tạo đơn hàng không thành công', error);
        res.status(500).json({ message: 'Lỗi khi tạo đơn hàng', error: error.message });
    }
});

module.exports = router;
