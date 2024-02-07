import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "./product.context";
export default function () {
  const cssClass = useDynamicCssClass();
  const { state, distapch } = useProductContext();
  const { name, width, widthOfPrintingArea, link, description, file } = state;
  const navigate = useNavigate();

  function clearState() {
    distapch({
      type: "CLEAR_ALL",
    });
  }

  return (
    <div className="w-100">
      <section className="w-100 d-flex mt-4 justify-content-center flex-column align-item-center  mt-5 ">
        <span className="success-logo ">
          <Icons.Cheked />
        </span>
        <Typography.H5 className="color-primary font-500 mt-4">
          محصول با موفقیت ثبت شد
        </Typography.H5>
      </section>
      <section className="w-100 d-flex justify-content-center align-item-center mt-5">
        <div className="uploaded-file-area p-4 d-flex">
          {file.file ? (
            <img
              className="upload-file-area-preview  img-fill"
              src={`${URL.createObjectURL(file.file)}`}
            />
          ) : null}

          <main className="w-100 d-flex justify-content-between align-items-center">
            <article className={"py-3 " + cssClass.ms_2}>
              <Typography.H7>{name.english}</Typography.H7>
              <div className="width mt-2">
                <Typography.H9 className="font-400 ">
                  {description.persian}
                </Typography.H9>
              </div>
            </article>
            <article className={" d-flex flex-column  " + cssClass.ms_2}>
              <div className="d-flex align-item-center justify-content-between ">
                <Typography.H7>عرض محصول</Typography.H7>
                <Typography.H8
                  language="en"
                  className={cssClass.ms_3 + " font-400 "}
                >
                  {width.value}
                </Typography.H8>
              </div>
              <div className="d-flex align-item-center justify-content-between   my-1-8rem">
                <Typography.H7>عرض برچسب</Typography.H7>
                <Typography.H8
                  language="en"
                  className={cssClass.ms_3 + " font-400 "}
                >
                  {widthOfPrintingArea.value} mm
                </Typography.H8>
              </div>
              <div className="d-flex align-item-center justify-content-between ">
                <Typography.H7>لینک سایت</Typography.H7>
                <Typography.H8 className={cssClass.ms_3 + " font-400 "}>
                  دارد
                </Typography.H8>
              </div>
            </article>
          </main>
        </div>
      </section>
      <footer className="w-100 d-flex justify-content-end mt-10 px-4 pb-4">
        <Buttons.Outlined
          onClick={() => {
            navigate("/admin/list-labels-products");
          }}
          className="button_extra-large"
        >
          <Typography.H8>مشاهده محصولات</Typography.H8>
        </Buttons.Outlined>
        <Buttons.Contained className={"button_extra-large " + cssClass.ms_3}>
          <Typography.H8 onClick={clearState}>افزودن محصول جدید</Typography.H8>
        </Buttons.Contained>
      </footer>
    </div>
  );
}
