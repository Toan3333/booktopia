const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  name: { type: String, require: true },
  username: { type: String, require: true },
  image: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  date: { type: String, require: true },
  address: { type: String, require: true },
  role: { type: Number, require: true, default: 0 },
});

module.exports = mongoose.models.users || mongoose.model("users", userSchema);
