import { useDynamicCssClass } from "../../../../../../recoil/readStore";
import Buttons from "../../../../../../styles/__ready/Buttons";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";

export default function ({
  info = {
    picture: "",
    name: () => {},
    width: "",
    height: "",
  },
}) {
  const cssClass = useDynamicCssClass();
  console.log(info);
  return (
    <div className="w-100">
      <section className="w-100 d-flex mt-4 justify-content-center flex-column align-item-center  mt-5 ">
        <span className="success-logo ">
          <Icons.Cheked />
        </span>
        <Typography.H5 className="color-primary font-500 mt-4">
          لیبل با موفقیت ثبت شد
        </Typography.H5>
      </section>
      <section className="w-100 d-flex justify-content-center align-item-center mt-5">
        <div className="uploaded-file-area p-4 d-flex">
          <img
            className="upload-file-area-preview  img-fill"
            src={`${URL.createObjectURL(info.picture)}`}
          />
          <main className="w-100 d-flex justify-content-between align-items-center">
            <article className={"py-3 " + cssClass.ms_2}>
              <Typography.H7> {info.name()}</Typography.H7>
              {/* <div className="width mt-2">
                <Typography.H9 className="font-400 ">
                  {info.description()}
                </Typography.H9>
              </div> */}
            </article>
            <article className={" d-flex flex-column  " + cssClass.ms_2}>
              <div className="d-flex align-item-center justify-content-between ">
                <Typography.H7>عرض لیبل</Typography.H7>
                <Typography.H8
                  language="en"
                  className={cssClass.ms_3 + " font-400 "}
                >
                  {info.width} mm
                </Typography.H8>
              </div>
              <div className="d-flex align-item-center justify-content-between   my-1-8rem">
                <Typography.H7>طول لیبل</Typography.H7>
                <Typography.H8
                  language="en"
                  className={cssClass.ms_3 + " font-400 "}
                >
                  {info.height} mm
                </Typography.H8>
              </div>
            </article>
          </main>
        </div>
      </section>
      <footer className="w-100 d-flex justify-content-end mt-10 px-4 pb-4">
        <Buttons.Outlined className="button_extra-large">
          <Typography.H8>مشاهده لیبل ها</Typography.H8>
        </Buttons.Outlined>
        <Buttons.Contained className={"button_extra-large " + cssClass.ms_3}>
          <Typography.H8>افزودن لیبل جدید</Typography.H8>
        </Buttons.Contained>
      </footer>
    </div>
  );
}
