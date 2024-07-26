import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import BlogList from "../../components/Blog/BlogList";

const BlogDetail = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="relative">
          <img src="./images/about.png" className="rounded-[30px]" alt="" />
        </div>
        <div className="max-w-[1100px] mx-auto relative z-20 -mt-32 border-b pb-10">
          <div className="rounded-[30px] border py-6 px-11 bg-white">
            <PageTitle title="Lợi ích của việc đọc sách"></PageTitle>
            <div className="text-grayText leading-normal font-normal">15/07/2024 </div>
            <div className="">
              <img src="./images/blog.png" className="w-full rounded-[30px] h-[355px]" alt="" />
              <p className="font-normal leading-normal mt-4">
                Đọc sách mang đến nhiều lợi ích bất ngờ mà bạn không hề biết đến. Đọc sách đúng
                cách giúp kích thích não bộ phát triển tốt hơn, hạn chế lão hóa và giảm khả năng mất
                trí nhớ. Ngoài ra, đọc sách cũng giúp con người ta nâng cao hiểu biết, làm giàu vốn
                từ, tăng khả năng tư duy, nhìn nhận vấn đề…
              </p>
              <div className="mb-5 mt-5">
                <div className="mb-4">1. Đọc sách giúp nâng cao hiểu biết</div>
                <p className="font-normal leading-normal">
                  Sách là nguồn tri thức vô hạn, giúp chúng ta có thể bổ sung kiến thức và nâng cao
                  vốn hiểu biết của chính mình. Ở sách, bạn có thể tìm tòi thêm về văn hoá - chính
                  trị, kinh tế - xã hội, lịch sử hoặc đơn giản hơn là phong cách sống,... Những điều
                  tưởng chừng nhỏ nhặt nhất trong cuộc sống như cách nói lời cảm ơn, xin lỗi cũng
                  được truyền tải nhẹ nhàng và tinh tế qua những trang sách. Có thể nói, sách đóng
                  vai trò “bổ trợ” cho mọi hoạt động giáo dục về nhận thức và ý thức. Đây cũng là lý
                  do chính người ta đưa văn hoá đọc vào chương trình giáo dục mầm non, giúp thế hệ
                  trẻ hình thành thói quen đọc sách ngay từ khi còn nhỏ.
                </p>
              </div>
              <div className="mb-5">
                <div className="mb-4">2. Tăng cường kỹ năng tư duy, phân tích, tập trung</div>
                <p className="font-normal leading-normal">
                  Một trong những tác dụng của việc đọc sách chính là khả năng tăng cường trí nhớ,
                  sự tập trung, cải thiện tư duy và kỹ năng phân tích tình huống. Trong quá trình
                  đọc, não bộ và mọi giác quan được đưa về trạng thái tập trung cao độ. Chính lúc
                  này, khả năng tư duy và phân tích nội dung cũng được đẩy mạnh nhằm tiếp thu tri
                  thức được truyền tải trong mỗi trang sách. Qua đó, giúp chúng ta cải thiện sự tập
                  trung, suy nghĩ cũng trở nên nhanh nhạy và sắc bén hơn.
                </p>
              </div>
              <div className="mb-5">
                <div className="mb-4">3. Đọc sách giúp mở rộng vốn từ</div>
                <p className="font-normal leading-normal">
                  Mỗi tác giả, mỗi chủ đề lại có cách dùng từ và lối biểu đạt riêng. Do đó, quá
                  trình đọc sách cũng đồng thời giúp chúng ta bổ sung thêm vốn từ vựng của mình, học
                  hỏi thêm nhiều thuật ngữ mới. Từ đây, văn phong của bạn cũng được cải thiện rõ rệt
                  qua từng ngày.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <PageTitle title="Bài viết khác" className="text-center"></PageTitle>
          <BlogList></BlogList>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
