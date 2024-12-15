const commentModel = require("../model/comment.model");
const productModel = require("../model/product.model");
const userModel = require("../model/user.model");

module.exports = {
  getAllComments,
  insertComment,
  updateCommentById,
  getCommentsByProduct,
  getCommentById,
  deleteComment,
};

// Show tất cả bình luận
async function getAllComments() {
  try {
    const result = await commentModel.find().populate("user", "name image");
    return result;
  } catch (error) {
    console.log("Lỗi lấy bình luận", error);
    throw error;
  }
}

// Lấy tất cả bình luận của một sản phẩm
async function getCommentsByProduct(productId) {
  try {
    const comments = await commentModel
      .find({ book: productId })
      .populate("user", "name image");

    return comments;
  } catch (error) {
    console.log("Lỗi lấy bình luận theo sản phẩm", error);
    throw error;
  }
}

// Thêm bình luận
async function insertComment(body) {
  try {
    const { content, user, book } = body;
    console.log("Nội dung bình luận:", content);

    const newComment = new commentModel({ content, user, book });
    const result = await newComment.save();

    return result;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
}

// Cập nhật bình luận theo ID
async function updateCommentById(id, body) {
  try {
    const comment = await commentModel.findById(id);
    if (!comment) {
      throw new Error("Không tìm thấy bình luận");
    }
    const { content } = body;
    const result = await commentModel.findByIdAndUpdate(id, { content });
    return result;
  } catch (error) {
    console.log("Lỗi update bình luận", error);
    throw error;
  }
}

// Xóa bình luận theo ID
async function deleteComment(id) {
  try {
    const result = await commentModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("Lỗi xóa bình luận theo ID", error);
    throw error;
  }
}

// Lấy chi tiết bình luận theo ID, bao gồm thông tin sản phẩm và người dùng
async function getCommentById(id) {
  try {
    const comment = await commentModel
      .findById(id)
      .populate("user", "name image") // Lấy tên và ảnh người dùng
      .populate({path: "book", model: "products"}) // Lấy thông tin sản phẩm
      .exec();

    if (!comment) {
      throw new Error("Bình luận không tồn tại");
    }

    return {
      commentId: comment._id,
      productCode: comment.book._id,
      customerName: comment.user.name,
      createdAt: comment.day,
      content: comment.content, 
      productDetails: [
        {
          image1: comment.book.image1, 
          name: comment.book.name, 
          author: comment.book.author, 
          category: comment.book.category,
          price1: comment.book.price1,
          price2: comment.book.price2, 
        },
      ],
    };
  } catch (error) {
    console.log("Lỗi lấy chi tiết bình luận", error);
    throw error;
  }
}
