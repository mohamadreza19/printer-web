import { TextField_small_Custom } from "../../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../../styles/__ready/Typography";
//
import { useDynamicCssClass } from "../../../../../../../recoil/readStore";
import useController from "../../../../../../../helper/admin_add_product_label/control_product_dynamic_input/index";
import { useEffect } from "react";
export default function ({ res }) {
  const cssClass = useDynamicCssClass();
  const meta = useController("widths");
  useEffect(() => {
    const width = res.data.width;
    const widthOfPrintingArea = res.data.widthOfPrintingArea;
    let e = {
      target: {
        value: "",
      },
    };
    e.target.value = width;
    meta.handler.handleonChangeWidth(e);
    e.target.value = widthOfPrintingArea;
    meta.handler.handleonChangWidthOfPrintingArea(e);
  }, []);

  useEffect(() => {
    return () => {
      const e = {
        target: {
          value: null,
        },
      };
      meta.handler.handleonChangeWidth(e);
      meta.handler.handleonChangWidthOfPrintingArea(e);
    };
  }, []);

  return (
    <main className="w-100 h-100 px-4 pt-2">
      <article className="mt-9 d-flex ">
        <section className="">
          <Typography.H8 className={"mb-1 " + cssClass.ms_3}>
            عرض محصول
          </Typography.H8>
          <TextField_small_Custom
            type="number"
            value={meta.state.width.value}
            onChange={meta.handler.handleonChangeWidth}
            className="product-label-upload-file-small-input"
          />
          <Typography.H10 className="color_danger">
            {meta.state.width.validateErr}
          </Typography.H10>
        </section>
        <section className={cssClass.ms_2}>
          <Typography.H8 className={"mb-1 " + cssClass.ms_3}>
            عرض محل چاپ
          </Typography.H8>
          <TextField_small_Custom
            type="number"
            className="product-label-upload-file-small-input"
            value={meta.state.widthOfPrintingArea.value}
            onChange={meta.handler.handleonChangWidthOfPrintingArea}
          />
          <Typography.H10 className="color_danger">
            {meta.state.widthOfPrintingArea.validateErr}
          </Typography.H10>
        </section>
      </article>
    </main>
  );
}
