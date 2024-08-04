const userModel = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = { updateById, register, login, getUserById };

// Đăng ký
async function register(body) {
  try {
    console.log("Dữ liệu nhận được từ request body:", body);
    // Lấy dữ liệu từ request body
    const { name, username, email, password, role } = body;

    // Kiểm tra dữ liệu
    console.log("name:", name);
    console.log("username:", username);
    console.log("email:", email);
    console.log("pass:", password);
    console.log("role:", role);

    // Kiểm tra email đã được đăng ký trước đó chưa
    let user = await userModel.findOne({ email: email });
    if (user) {
      throw new Error("Email đã tồn tại");
    }

    // Mã hóa mật khẩu
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    // Tạo mới người dùng
    user = new userModel({
      name,
      username,
      email,
      password: hash,
      role: role || 0,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    const result = await user.save();
    return result;
  } catch (error) {
    console.log("Lỗi đăng ký:", error);
    throw error;
  }
}

// Đăng nhập
async function login(body) {
  try {
    // Lấy dữ liệu từ request body
    const { email, password } = body;

    // Tìm người dùng trong cơ sở dữ liệu
    let user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("Email không tồn tại");
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Mật khẩu không chính xác");
    }

    // Xóa trường pass từ đối tượng người dùng
    delete user._doc.password;

    // Tạo access token có hạn trong 1 phút
    const accessToken = jwt.sign(
      { _id: user._id, email: user.email, name: user.name, role: user.role },
      "access_token_secret",
      { expiresIn: "1m" }
    );

    // Tạo refresh token có hạn trong 1 phút
    const refreshToken = jwt.sign(
      { _id: user._id, email: user.email, name: user.name, role: user.role },
      "refresh_token_secret",
      { expiresIn: "1h" }
    );

    // Lưu trữ refresh token vào cơ sở dữ liệu hoặc bộ nhớ của máy chủ

    // Gửi thông tin người dùng cùng với access token và refresh token về cho client
    return { user: user, accessToken: accessToken, refreshToken: refreshToken };
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    throw error;
  }
}

// Cập nhật user

async function updateById(id, body) {
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("Không tìm thấy user");
    }
    const { name, username, img, password, email, phone, date, address, role } = body;
    const result = await userModel.findByIdAndUpdate(id, {
      name,
      username,
      img,
      password,
      email,
      phone,
      date,
      address,
      role,
    });
    return result;
  } catch (error) {
    console.log("lỗi update", error);
    throw error;
  }
}
async function getUserById(id) {
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("Lấy chi tiết user không thành công");
    }
    return user;
  } catch (error) {
    console.log("Lỗi", error);
    throw error;
  }
}

// async function gettAll (){
//     try {
//         const result = await userModel.find();
//         return result;
//     } catch (error) {
//         console.log('Lỗi lấy danh sách user', error);
//         throw error;
//     }

// }

// xóa user theo id
// async function remove(id) {
//   try {
//     const result = await userModel.findByIdAndDelete(id);
//     return result;
//   } catch (error) {
//     console.log("LỖI XÓA USER THEO ID", error);
//     throw error;
//   }
// }

// async function login(body) {
//     try {
//         // lấy dữ liệu
//         const {email , pass} = body;
//         // kiem tra email
//         let user = await userModel.findOne({email : email})
//         if (!user) {
//             throw new Error('Email khong ton tai')
//         }
//         // kiểm tra pass
//         const checkpass = bcrypt.compareSync(pass, user.pass)
//         if (!checkpass) {
//             throw new Error('Mật khẩu không chính xác')
//         }
//         //xóa field pass
//         delete user._doc.pass
//         // tạo token
//         const token = jwt.sign(
//             {_id : user._id, email : user.email, role : user.role},
//             'duongdiem', // key secret
//             {expiresIn: 1 * 1 *60 } // thời gian hết hạn của token
//         )

//         user = {...user._doc, token}
//         return user
//     } catch (error) {
//         console.log('LỖI', error);
//         throw error;
//     }
// }
//muốn xem sản phẩm mới thì người dùng cần đăng nhập để xem sp mới thì mình làm cái kiểm tra bằng token
