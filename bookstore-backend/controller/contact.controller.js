const Contact = require("../model/contact.model");
const nodemailer = require("nodemailer");
require("dotenv").config();

const contactController = {
  createContact: async (body) => {
    try {
      const { name, email, message } = body;

      // Lưu thông tin liên hệ vào MongoDB
      const newContact = new Contact({ name, email, message });
      await newContact.save();

      // Gửi email thông báo
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const imgLogo = `https://res.cloudinary.com/dufekzvxl/image/upload/f_auto,q_auto/mydizuu...ffuzqpvp
`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVING_EMAIL,
        subject: "Thông báo: Liên hệ mới từ website",
        text: `Tên: ${name}\nEmail: ${email}\nLời nhắn: ${message}`,
        attachments: [
          {
            filename: "logo1.png",
            path: `public\\images\\logo1.png`, // Đường dẫn đến file trên server của bạn
            cid: "unique@logo", // Sử dụng CID để tham chiếu trong HTML
          },
        ],
        html: `
       <div
          style="font-family: Arial, sans-serif; color: #2c3e50; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ecf0f1; border-radius: 8px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); background-color: #ffffff;">
          <h2 style="color: #166534; text-align: center; font-size: 20px; margin: 0;">Thông liên hệ từ khách hàng</h2>

          <div style="text-align: center; margin: 20px 0;">
              <img src="cid:unique@logo" alt="Logo" style="width: 100px">
          </div>

          <p style="font-size: 16px; margin: 0 0 10px;">Xin chào,</p>
          <p style="font-size: 16px; margin: 0 0 20px;">Dưới đây là thông tin liên hệ mà khách hàng đã gửi đến:</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
              <tr>
                  <td
                      style="border: 1px solid #ecf0f1; padding: 12px; background-color: #f8f9fa; font-weight: bold; color: #166534; width: 30%;">
                      Tên</td>
                  <td style="border: 1px solid #ecf0f1; padding: 12px; color: #34495e;">${name}</td>
              </tr>
              <tr>
                  <td
                      style="border: 1px solid #ecf0f1; padding: 12px; background-color: #f8f9fa; font-weight: bold; color: #166534;">
                      Email</td>
                  <td style="border: 1px solid #ecf0f1; padding: 12px; color: #34495e;">${email}</td>
              </tr>
              <tr>
                  <td
                      style="border: 1px solid #ecf0f1; padding: 12px; background-color: #f8f9fa; font-weight: bold; color: #166534;">
                      Lời nhắn</td>
                  <td style="border: 1px solid #ecf0f1; padding: 12px; color: #34495e;">${message}</td>
              </tr>
          </table>

          <p style="margin-top: 20px; font-size: 16px; color: #2c3e50;">Vui lòng phản hồi khách hàng sớm nhất có thể!</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ecf0f1;">
          <p style="font-size: 13px; color: #166534; text-align: center;">
              BookStore - BookTopia.
          </p>
      </div>
    `,
      };

      await transporter.sendMail(mailOptions);

      return { message: "Form đã gửi thành công" };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getContacts: async () => {
    try {
      const contacts = await Contact.find();
      return contacts;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = contactController;
