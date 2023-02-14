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
        // width: "600px",
        position: "relative",
      }}
      className="w-100"
    >
      <RightArrow
        language={language}
        onClick={() => swiperRef.current?.slideNext()}
      />
      <Swiper
        className="border-radius4 "
        slidesPerView={2.5}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        style={{
          //   direction: language === "fa" ? "rtl" : "ltr",
          direction: "ltr",

          // height: "320px",
          // maxHeight: "320px",
          zIndex: 1,
          //   position: "absolute",
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        // pagination={{
        //   clickable: true,
        //   renderBullet: function (index, className) {
        //     return `<span class="${className}"></span>`;
        //   },
        // }}
      >
        {ads.items.map((item, index) => {
          return (
            <SwiperSlide
              style={{
                // width: "95% !important",
                // height: "350px !important",
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
              }}
              key={index}
            >
              <img
                style={{
                  // objectFit: "fill",
                  width: "95%",
                  // height: "350px",
                  borderRadius: "50px",
                }}
                src={item}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <LeftArrow
        language={language}
        onClick={() => swiperRef.current?.slidePrev()}
      />
    </div>
  );
}
