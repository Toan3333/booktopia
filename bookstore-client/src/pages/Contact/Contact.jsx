import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";

const Contact = () => {
  return (
    <div className="py-8">
      <PageTitle title="Liên hệ" className="text-center"></PageTitle>
      <div className="container">
        <div className="flex justify-between mt-8 mb-8 gap-5">
          <div className="max-w-[630px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4544374621605!2d106.62420897433624!3d10.852999257778052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1721134199412!5m2!1svi!2s"
              width={630}
              height={450}
              style={{ border: 0, borderRadius: "30px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="w-full">
            <h3 className="mb-4">Để lại lời nhắn cho chúng tôi</h3>
            <form action="" className="flex flex-col gap-6">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="input  input-bordered w-full"
                />
              </div>
              <div className="w-full">
                <input type="email" placeholder="Email" className="input input-bordered w-full" />
              </div>
              <div className="w-full">
                <textarea
                  className="textarea rounded-[30px] w-full textarea-bordered h-[220px]"
                  placeholder="Lời nhắn..."></textarea>
              </div>
              <div>
                <Button children="Gửi"></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
