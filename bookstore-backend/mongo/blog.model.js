// kết nối collection blog

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// khóa chính id

const blogSchema = new Schema({
  name: { type: String, require: true }, // require true là bắt buộc ---- fasle là ko bắt buộc
  date: { type: Date, default: Date.now },
  image: { type: String, require: true },
  content: { type: String, require: true },
});

module.exports = mongoose.models.blogs || mongoose.model("blogs", blogSchema);
// kiển tra xem nó tồn tại cái model chưa, nếu chưa thì thêm vào
