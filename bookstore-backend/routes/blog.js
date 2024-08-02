var express = require("express");
var router = express.Router();
const blogController = require("../mongo/blog.controller");

//hiển tất cả bài viết
router.get("/", async (req, res) => {
  try {
    const blog = await blogController.getAll();
    return res.status(200).json(blog);
  } catch (error) {
    console.log("Không load được bài viết", error);
    res.status(500).json({ mess: error });
  }
});

//hiển thị bài viết theo id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await blogController.getBlogById(id);
    return res.status(200).json(results);
  } catch (error) {
    console.log("Không load được bài viết", error);
    res.status(500).json({ mess: error.message });
  }
});

//thêm bài viết mới
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const result = await blogController.insert(body);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Không thêm được bài viết", error);
    res.status(500).json({ mess: error });
  }
});

//sửa bài viết
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const blogUpdate = await blogController.updateById(id, body);
    return res.status(200).json(blogUpdate);
  } catch (error) {
    console.log("Không sửa được bài viết", error);
    return res.status(500).json({ mess: error });
  }
});

//xóa bài viết
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogDel = await blogController.remove(id);
    console.log("Xóa bài viết thành công");
    return res.status(200).json(blogDel);
  } catch (error) {
    console.log("Không xóa được bài viết", error);
    return res.status(500).json({ mess: error });
  }
});

//tìm kiếm bài viết theo tên
router.get("/search/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const results = await blogController.findByName(name);
    return res.status(200).json(results);
  } catch (error) {
    console.log("Không tìm được bài viết", error);
    return res.status(500).json({ mess: error });
  }
});

//lọc bài viết mới
router.get("/newblog", async (req, res) => {
  try {
    const result = await blogController.getNewBlog();
    return res.status(200).json(result);
  } catch (error) {
    console.log("Không lấy được bài viết mới", error);
    return res.status(500).json({ mess: error });
  }
});

module.exports = router;
