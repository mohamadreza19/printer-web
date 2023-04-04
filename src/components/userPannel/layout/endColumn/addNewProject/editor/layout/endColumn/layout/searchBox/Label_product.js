import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import {
  Down,
  PlusPeoduct_Labels,
  StarOne,
  Up,
} from "../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <div className="w-100">
      <article className="w-100 d-flex flex-column px-3 pb-4 mb-3 product-label-box ">
        <div className="d-flex">
          <header className="d-flex  align-items-center justify-content-center">
            <span className="product-label-picture d-flex justify-content-center align-items-center">
              <img className="w-100 h-100" src="/image/editor/image-25.png" />
            </span>
          </header>
          <footer className={"d-flex flex-column " + cssClass.ms_1}>
            <Typography.H8 className="font-500 mb-1">
              ترمینال پیچی سری آرت
            </Typography.H8>
            <Typography.H9 className="font-400">
              ترمينال هاي هادي حفاظتي از لحاظ جزئيات طراحي و ويژگي ها مشابه
              ترمينال RTP می باشند که دارای بدنه عایقی ...{" "}
            </Typography.H9>
          </footer>
        </div>
        <div className={"d-flex align-items-center   mt-3 " + cssClass.ps_4}>
          <header className="product-label-plus-box  d-flex align-item-center justify-content-end ">
            <header className="product-label-icon-plus-box d-flex justify-content-center align-items-center">
              <PlusPeoduct_Labels />
            </header>
            <Typography.H8 className={cssClass.me_3}>1</Typography.H8>
            <footer className={"d-flex flex-column " + cssClass.me_1}>
              <span className="d-flex justify-content-center align-item-center mb-1">
                <Up className_for_path={"fill_secondray_v2 "} />
              </span>
              <span className="d-flex justify-content-center align-item-center ">
                <Down className_for_path={"fill_secondray_v2"} />
              </span>
            </footer>
          </header>
          <footer className="w-100 d-flex align-items-center justify-content-between  ">
            <span
              className={
                "d-flex justify-content-center align-items-center " +
                cssClass.ms_2
              }
            >
              <StarOne
                className="bookmark-secendary"
                className_for_path="fill_secondray_v2"
              />
            </span>
            <section>
              <Typography.H9_5 className="font-400 see-in-site">
                مشاهده در سایت
              </Typography.H9_5>
            </section>
          </footer>
        </div>
      </article>
    </div>
  );
}
