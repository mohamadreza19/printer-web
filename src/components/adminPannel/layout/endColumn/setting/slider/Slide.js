import { useEffect } from "react";
import {
  Admin_User_Symbol,
  Admin_User_ImageSlide,
} from "../../../../../../reactQuery/common/callGetService";
import { AdminDelete_ImageSlide_Mutation } from "../../../../../../reactQuery/admin/callDeleteService";
import Icons from "../../../../../../styles/__ready/Icons";

function Slide({ id }) {
  const slide = Admin_User_ImageSlide("admin");
  const delete_slide = AdminDelete_ImageSlide_Mutation();
  useEffect(() => {
    slide.mutate({ id });
  }, []);
  function deleteSymbol() {
    delete_slide.mutate({ id });
  }

  if (slide.isSuccess) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center mb-5">
        <article
          style={{
            border: "1px solid rgb(203 203 203 / 51%)",
            borderRadius: "10px",
          }}
          className="w-100 h-100 p-2 mb-2"
        >
          <img
            style={{
              objectFit: "contain",
              // width: "120px",
              // height: "52px",
              minHeight: "100px",
              minWidth: "200px",
              maxWidth: "200px",
              maxHeight: "100px",
            }}
            className="w-100 h-100"
            src={URL.createObjectURL(slide.data)}
          />
          {/* {slide.data.replace('"', "")} */}
        </article>
        <article className="cur-pointer" onClick={deleteSymbol}>
          <Icons.Trash />
        </article>
      </div>
    );
  }
}

export default Slide;
