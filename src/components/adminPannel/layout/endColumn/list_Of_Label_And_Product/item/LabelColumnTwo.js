import { useDynamicCssClass } from "../../../../../../recoil/readStore";
import Typography from "../../../../../../styles/__ready/Typography";

export default function ({ width, height }) {
  const cssClass = useDynamicCssClass();
  return (
    <div
      className={
        "px-5 d-flex align-items-center justify-content-center flex-column " +
        cssClass.ms_2
      }
    >
      <span className="d-flex mb-2">
        <Typography.H9_5 className="font-500">طول لیبل</Typography.H9_5>
        <Typography.H9_5 className={cssClass.ms_2} language="en">
          {height} mm
        </Typography.H9_5>
      </span>
      <span className="d-flex">
        <Typography.H9_5 className="font-500">عرض لیبل</Typography.H9_5>
        <Typography.H9_5 className={cssClass.ms_2} language="en">
          {width} mm
        </Typography.H9_5>
      </span>
    </div>
  );
}
