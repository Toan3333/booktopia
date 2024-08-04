const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
  name: { type: String, require: true },
  date: { type: Date, default: Date.now },
  image: { type: String, require: true },
  content: { type: String, require: true },
});

module.exports = mongoose.models.blogs || mongoose.model("blogs", blogSchema);
