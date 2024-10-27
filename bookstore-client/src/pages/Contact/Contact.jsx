import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ và tên'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    message: Yup.string().required('Vui lòng nhập lời nhắn'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/contact/api/contact', data);
      toast.success('Gửi tin nhắn thành công!'); 
      reset(); 
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại.'); 
    }
  };

  return (
    <div className="py-8">
      <ToastContainer autoClose={3000} /> 
      <PageTitle title="Liên hệ" className="text-center text:[24px]"></PageTitle>
      <div className="container">
        <div className="flex justify-between mt-8 mb-8 gap-5 max-md:flex-col">
          <div className="max-w-[630px] w-full max-md:w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4544374621605!2d106.62420897433624!3d10.852999257778052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1721134199412!5m2!1svi!2s"
              width="100%"
              height={350}
              style={{ border: 0, borderRadius: "30px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="w-full">
            <h3 className="mb-4">Để lại lời nhắn cho chúng tôi</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="w-full">
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Họ và tên"
                  className="input input-bordered w-full"
                />
                <p className="text-red text-[14px] mt-1">{errors.name?.message}</p>
              </div>
              <div className="w-full">
                <input
                  type="email"
                  {...register('email')}
                  placeholder="Email"
                  className="input input-bordered w-full"
                />
                <p className="text-red text-[14px] mt-1">{errors.email?.message}</p>
              </div>
              <div className="w-full">
                <textarea
                  {...register('message')}
                  className="textarea rounded-[30px] w-full textarea-bordered h-[220px]"
                  placeholder="Lời nhắn..."
                ></textarea>
                <p className="text-red text-[14px] mt-1 ">{errors.message?.message}</p>
              </div>
              <div>
                <Button>
                  Gửi
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
