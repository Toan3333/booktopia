var express = require("express");
var router = express.Router();
const contactController = require("../controller/contact.controller");

router.post("/api/contact", async (req, res) => {
  try {
    const body = req.body;

    const result = await contactController.createContact(body);
    return res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi gửi form", error: error.message });
  }
});

router.get("/api/contacts", async (req, res) => {
  try {
    const result = await contactController.getContacts();
    return res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Có lỗi xảy ra khi lấy thông tin liên hệ",
        error: error.message,
      });
  }
});

module.exports = router;
