import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import { StarOne } from "../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../styles/__ready/Typography";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function () {
  const cssClass = useDynamicCssClass();
  const favarites = [
    "ترمینال پیچی",
    "ترمینال پیچی",
    "ترمینال پیچی",
    "ترمینال پیچی",
  ];
  return (
    <Swiper
      style={{
        //   direction: language === "fa" ? "rtl" : "ltr",
        direction: "rtl",

        zIndex: 1,
      }}
      slidesPerView={3}
      // spaceBetween={0.2}
      className={
        "w-100 py-3  d-flex align-items-center editor-searchbox-bookmarks-scrollable  " +
        cssClass.ps_2
      }
    >
      {/* <span className={cssClass.me_2}>
        <StarOne />
      </span> */}
      <SwiperSlide className="editor-searchbox-star">
        <span className={cssClass.me_2}>
          <StarOne />
        </span>
      </SwiperSlide>
      {favarites.map((favarite, index) => (
        <SwiperSlide
          key={index}
          className={
            "editor-searchbox-gray-bookmark d-flex justify-content-center align-items-center " +
            cssClass.me_1
          }
        >
          <Typography.H9_5 className="color_black-v2">
            {favarite}
          </Typography.H9_5>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
