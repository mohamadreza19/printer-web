import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <div className="w-100 d-flex justify-content-between align-items-center pb-3 border-bottom-gray">
      <section className="d-flex">
        <Icons.Trade classNameForPath="fill_black" />
        <Typography.H8 className={"font-500 " + cssClass.ms_2}>
          آمار چاپ کلی
        </Typography.H8>
      </section>
      <section className="d-flex">
        <Buttons.Outlined_Custom className="button_medium_v1">
          <Icons.Vector svgClassName="mx-1" />
          <Typography.H8 className={cssClass.ms_1}>
            بازه زمانی دلخواه
          </Typography.H8>
        </Buttons.Outlined_Custom>
        <select className={"select-large " + cssClass.ms_2} id="select-medium">
          <option>هفتگی</option>
          <option>روزانه</option>
        </select>
      </section>
    </div>
  );
}
