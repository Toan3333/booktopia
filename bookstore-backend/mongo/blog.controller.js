const blogModel = require("./blog.model");

module.exports = {
  getAll,
  insert,
  getBlogById,
  updateById,
  remove,
  findByName,
  getNewBlog
};

//hiển thị tất cả bài viết
async function getAll() {
  try {
    const result = await blogModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi lấy bài viết", error);
    throw error;
  }
}

//hiển thị bài viết theo id
async function getBlogById(blogId) {
  try {
    const result = await blogModel.findById(blogId);
    return result;
  } catch (error) {
    console.log("Lỗi lấy bài viết theo id", error);
    throw error;
  }
}

//thêm bài viết
async function insert(body) {
  try {
    const { name, date, image, content } = body;

    const newBlog = new blogModel({ name, date, image, content });
    const result = await newBlog.save();
    return result;
  } catch (error) {
    console.error("Lỗi thêm bài viết:", error);
    throw error;
  }
}

//sửa bài viết
async function updateById(id, body) {
  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      throw new Error("Không tìm thấy bài viết");
    }
    const { name, image, content } = body;
    const result = await blogModel.findByIdAndUpdate(id, {
      name,
      image,
    
      content,
    });
    return result;
  } catch (error) {
    console.log("Lỗi cập nhật bài viết", error);
    throw error;
  }
}

// xóa bài viết theo id
async function remove(id) {
  try {
    const result = await blogModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("Lỗi xóa bài viết", error);
    throw error;
  }
}

//tìm kiếm bài viết theo tên
async function findByName(name) {
  try {
    const regexName = name.replace(/\s/g, ".*");
    const results = await blogModel.find({
      name: { $regex: regexName, $options: "i" },
    });
    return results;
  } catch (error) {
    console.log("Lỗi tìm kiếm bài viết", error);
    throw error;
  }
}



//lọc bài viết theo ngày 
async function getNewBlog() {
  try {
    const results = await blogModel
      .find()
      .sort({ date: -1 })
    return results;
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm mới:", error.message);
    throw error;
  }
}