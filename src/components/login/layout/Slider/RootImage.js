import { useEffect } from "react";
import { Admin_User_ImageSlide } from "../../../../reactQuery/common/callGetService";

export default function ({ id }) {
  const slide = Admin_User_ImageSlide();
  useEffect(() => {
    slide.mutate({ id });
  }, []);
  if (slide.isSuccess)
    return (
      <img
        className="mx-auto"
        // src="https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg"
        src={URL.createObjectURL(slide.data)}
        style={{
          width: "480px",
          height: "380px",
          maxWidth: "480px",
          minWidth: "480px",
          minHeight: "380px",
          maxHeight: "380px",
          boxShadow: "0px 30px 60px -10px rgba(0, 0, 0, 0.70)",
          borderRadius: "50px",
        }}
      />
    );
}
