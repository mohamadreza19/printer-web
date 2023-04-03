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
  //   const ads = {
  //     items: [
  //       "https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg",
  //       "https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg",
  //       "https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg",
  //     ],
  //   };
  const language = useLanguage();

  const swiperRef = useRef(null);
  console.log(swiperRef);

  return (
    <div
      style={{
        height: "40%",
        position: "relative",
      }}
      className="w-100 py-3"
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
        spaceBetween={0}
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
                display: "flex",
                justifyContent: "center",
              }}
              key={index}
            >
              <img
                style={{
                  width: "90%",
                  borderRadius: "50px",
                }}
                src={item}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
