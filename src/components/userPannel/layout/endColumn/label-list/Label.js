import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <div
      style={{
        width: "220px",
        height: "164px",
        maxWidth: "220px",
        maxHeight: "164px",
      }}
      className="bg_gray2 border-r-25"
    >
      <section className="w-100 d-flex align-item-center justify-content-center">
        <img
          style={{
            width: "180px",
            height: "46.74px",
          }}
          src="/image/label/image-22.png"
          className="mt-2 "
        />
      </section>

      <section
        style={{
          width: "220px",
          height: "101.22px",
          minHeight: "101.22px",
        }}
        className="bg-white border mt-3 border border-r-25"
      >
        <div className="w-100 d-flex align-item-center justify-content-between mt-2 px-3 ">
          <Typography.Body2 className="font-500 h_41px">
            مانیتور چرخان گیرنده ی هوشمند F21
          </Typography.Body2>
          <Icons.Star2 className="align-self-start cur-pointer" />
        </div>
        <div className="w-100 d-flex align-item-center justify-content-between  px-2 pb-2">
          <Typography.Body2 className="font-400  font-English disabled_gray2 dir-ltr ms-2">
            <span
              //   style={{
              //     marginRight: "0.2rem",
              //   }}
              className={cssClass.ms_extraSmall}
            >
              {"210×150"}
            </span>
            <span>mn</span>
          </Typography.Body2>
          <Buttons.Contained_Custom className="icon-small-box-padding border-r-circle bg_primary ">
            <Icons.Print />
          </Buttons.Contained_Custom>
        </div>
      </section>
    </div>
  );
}
