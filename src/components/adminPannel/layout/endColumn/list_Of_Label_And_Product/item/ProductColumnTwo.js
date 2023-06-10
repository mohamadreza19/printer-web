import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
import Typography from "../../../../../../styles/__ready/Typography";

export default function ({ width, widthOfPrintingArea }) {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.label_Product_List.item
      .colOne;
  return (
    <div
      className={
        "px-5 d-flex align-items-center justify-content-center flex-column " +
        cssClass.ms_2
      }
    >
      <span className="d-flex mb-2 white-space-nowrap">
        <Typography.H9_5 className="font-500">
          {content.product.width}
        </Typography.H9_5>
        <Typography.H9_5 className={cssClass.ms_2} language="en">
          {width} mm
        </Typography.H9_5>
      </span>
      <span className="d-flex">
        <Typography.H9_5 className="font-500 white-space-nowrap">
          {content.product.labelwidth}
        </Typography.H9_5>
        <Typography.H9_5 className={cssClass.ms_2} language="en">
          {widthOfPrintingArea} mm
        </Typography.H9_5>
      </span>
    </div>
  );
}
