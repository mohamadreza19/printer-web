import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import { useLanguage } from "../../../../recoil/readStore";

import RightArrow from "./RightArrow";
import LeftArrow from "./LeftArrow";
import { Admin_User_ImageSlide } from "../../../../reactQuery/common/callGetService";
import { useEffect } from "react";
export default function ({ data }) {
  const slide = Admin_User_ImageSlide();

  const language = useLanguage();

  const swiperRef = useRef(null);

  return (
    <div
      style={{
        height: "240px",
        position: "relative",
        maxHeight: "240px",
      }}
      className="w-100 arrow-test-box"
    >
      <RightArrow
        language={language}
        onClick={() => swiperRef.current?.slideNext()}
      />
      <LeftArrow
        language={language}
        onClick={() => swiperRef.current?.slidePrev()}
      />

      <Swiper
        className="border-radius4 h-100"
        slidesPerView={2.5}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={3}
        style={{
          //   direction: language === "fa" ? "rtl" : "ltr",
          direction: "ltr",
          zIndex: 1,
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <ImageSlide id={item.id} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

const ImageSlide = ({ id }) => {
  const slide = Admin_User_ImageSlide();

  useEffect(() => {
    slide.mutate({ id });
  }, []);
  if (slide.isSuccess)
    return (
      <img
        style={{
          borderRadius: "20px",
          boxShadow: "0px 30px 25px -20px rgba(0, 0, 0, 0.60)",
          minHeight: "240px",
          minWidth: "240px",
          maxWidth: "240px",
          maxHeight: "240px",
        }}
        className="w-100 h-100"
        src={URL.createObjectURL(slide.data)}
      />
    );
};
