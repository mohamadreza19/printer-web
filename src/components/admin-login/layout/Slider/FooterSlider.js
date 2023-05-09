import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { useLanguage } from "../../../../recoil/readStore";
import { Button } from "@mui/material";
import RightArrow from "./RightArrow";
import LeftArrow from "./LeftArrow";
export default function () {
  const ads = {
    items: [
      "/image/login_slider/image_14.png",
      "/image/login_slider/image_14.png",
      "/image/login_slider/image_13.png",
      "/image/login_slider/image_14.png",
      "/image/login_slider/image_14.png",
      "/image/login_slider/image_13.png",
    ],
  };

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
        {ads.items.map((item, index) => {
          return (
            <SwiperSlide
              style={{
                width: "260px",
                maxWidth: "260px",
                maxHeight: "260px",
                height: "260px",
                display: "flex",
                justifyContent: "center",
              }}
              key={index}
            >
              <img className="w-100 h-100" src={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
