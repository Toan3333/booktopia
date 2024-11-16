const reviewModel = require("../model/review.model");
const orderController = require("../controller/order.controller");
const productModel = require("../model/product.model");
const userModel = require("../model/user.model");

module.exports = {
  getAllReviews,
  insertReview,
  //   updateCommentById,
  getReviewByProduct,
  getReviewById,
  deleteReview,
  createReview,
};

// Show tất cả bình luận
async function getAllReviews() {
  try {
    // Thêm 'rating' vào populate hoặc trực tiếp truy xuất
    const result = await reviewModel
      .find()
      .populate("user", "name image") // Lấy thông tin người dùng (name và image)
      .select("content rating day user"); // Lấy thêm content, rating, day và user

    return result;
  } catch (error) {
    console.log("Lỗi lấy đánh giá", error);
    throw error;
  }
}

// Lấy tất cả đánh giá của một sản phẩm
async function getReviewByProduct(productId) {
  try {
    const comments = await reviewModel.find({ book: productId }).populate("user", "name image");

    return comments;
  } catch (error) {
    console.log("Lỗi lấy bình luận theo sản phẩm", error);
    throw error;
  }
}

// Thêm đánh giá
async function insertReview(body) {
  try {
    const { content, user, book, rating } = body;

    // Kiểm tra rating hợp lệ (nếu cần)
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    console.log("Nội dung đánh giá:", content);
    console.log("Đánh giá sao:", rating);

    // Tạo mới một review với rating
    const newReview = new reviewModel({ content, user, book, rating });
    const result = await newReview.save();

    return result;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
}

// Cập nhật bình luận theo ID
// async function updateCommentById(id, body) {
//   try {
//     const comment = await commentModel.findById(id);
//     if (!comment) {
//       throw new Error("Không tìm thấy bình luận");
//     }
//     const { content } = body;
//     const result = await commentModel.findByIdAndUpdate(id, { content });
//     return result;
//   } catch (error) {
//     console.log("Lỗi update bình luận", error);
//     throw error;
//   }
// }

// Xóa bình luận theo ID
async function deleteReview(id) {
  try {
    const result = await reviewModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("Lỗi xóa bình luận theo ID", error);
    throw error;
  }
}

// Chi tiết bình luận theo ID
async function getReviewById(id) {
  try {
    const review = await reviewModel.findById(id);
    return review;
  } catch (error) {
    console.log("Lỗi lấy chi tiết bình luận", error);
    throw error;
  }
}

async function createReview(req, res) {
  const { userId, productId, rating, content } = req.body;

  try {
    // Kiểm tra trạng thái thanh toán và giao hàng của đơn hàng
    await orderController.checkOrderPaidAndShipped(userId, productId);

    // Nếu đơn hàng hợp lệ, tạo đánh giá
    const newReview = new reviewModel({
      userId,
      productId,
      rating,
      content,
      day: Date.now(),
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
