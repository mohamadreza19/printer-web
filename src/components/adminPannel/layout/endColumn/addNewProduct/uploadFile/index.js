import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
import {
  TextFieldFUN_v5,
  TextFieldFUN_v4,
  TextField_small_Custom,
} from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";
import UploadAera from "./UploadAera";
import Header from "./Header";
import TextFieldsBox from "./TextFieldsBox";
import Buttons from "../../../../../../styles/__ready/Buttons";
import Icons from "../../../../../../styles/__ready/Icons";

export default function () {
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label;
  const cssClass = useDynamicCssClass();
  const continue_ = false;
  return (
    <div className="w-100 ">
      <Header />
      {!continue_ ? (
        <>
          <TextFieldsBox />
          <UploadAera />
          <footer className="w-100 d-flex justify-content-end mt-6 pb-5 ">
            <Buttons.Contained
              onClick={() => {
                // handleSubmit_FirstPage(ff)
              }}
              className="button_large"
            >
              <Typography.H7 className="font-400">ادامه</Typography.H7>
            </Buttons.Contained>
          </footer>
        </>
      ) : (
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
              <img
                className="upload-file-area-preview  img-fill"
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
                }
              />
              <main className="w-100 d-flex justify-content-between align-items-center">
                <article className={"py-3 " + cssClass.ms_2}>
                  <Typography.H7>ترمینال پیچی سری آرت</Typography.H7>
                  <div className="width mt-2">
                    <Typography.H9 className="font-400 ">
                      ترمينال هاي هادي حفاظتي از لحاظ جزئيات طراحي و ويژگي ها
                      مشابه ترمينال RTP می باشند که دارای بدنه عایقی ...
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
                      220 mm
                    </Typography.H8>
                  </div>
                  <div className="d-flex align-item-center justify-content-between   my-1-8rem">
                    <Typography.H7>عرض برچسب</Typography.H7>
                    <Typography.H8
                      language="en"
                      className={cssClass.ms_3 + " font-400 "}
                    >
                      220 mm
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
            <Buttons.Outlined className="button_extra-large">
              <Typography.H8>مشاهده محصولات</Typography.H8>
            </Buttons.Outlined>
            <Buttons.Contained
              className={"button_extra-large " + cssClass.ms_3}
            >
              <Typography.H8>افزودن محصول جدید</Typography.H8>
            </Buttons.Contained>
          </footer>
        </div>
      )}
    </div>
  );
}
