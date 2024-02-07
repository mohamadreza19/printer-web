import { TextField_small_Custom } from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";
//
import { useDynamicCssClass } from "../../../../../../recoil/readStore";
import useController from "../../../../../../helper/admin_add_product_label/control_product_dynamic_input/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getProductWidth,
  getProductWidthOfPrintingArea,
} from "../../../../../../redux/product/product_slice";
export default function () {
  const cssClass = useDynamicCssClass();
  const width = useSelector(getProductWidth);

  const widthOfPrintingArea = useSelector(getProductWidthOfPrintingArea);
  const dispatch = useDispatch();

  function handleChangeWidth(event) {
    const value = event.target.value;

    const payload = {
      type: "ADD/WIDTH",
      value,
    };
    dispatch(addProduct(payload));
  }
  function handleChangeWidthOfPrintingArea(event) {
    const value = event.target.value;

    const payload = {
      type: "ADD/WIDTHOFPRINTINGAREA",
      value,
    };
    dispatch(addProduct(payload));
  }

  return (
    <main className="w-100 h-100 px-4 pt-2">
      <article className="mt-9 d-flex ">
        <section className="">
          <Typography.H8 className={"mb-1 " + cssClass.ms_3}>
            عرض محصول
          </Typography.H8>
          <TextField_small_Custom
            type="number"
            value={width}
            onChange={handleChangeWidth}
            className="product-label-upload-file-small-input"
          />
          <Typography.H10 className="color_danger">
            {/* {meta.state.width.validateErr} */}
          </Typography.H10>
        </section>
        <section className={cssClass.ms_2}>
          <Typography.H8 className={"mb-1 " + cssClass.ms_3}>
            عرض محل چاپ
          </Typography.H8>
          <TextField_small_Custom
            type="number"
            className="product-label-upload-file-small-input"
            onChange={handleChangeWidthOfPrintingArea}
            value={widthOfPrintingArea}
          />
          <Typography.H10 className="color_danger">
            {/* {meta.state.widthOfPrintingArea.validateErr} */}
          </Typography.H10>
        </section>
      </article>
    </main>
  );
}
