import { TextFieldFUN_ClipBoardBadge } from "../../../../../styles/__ready/Textfields";
import {
  useDynamicCssClass,
  useContent_Based_Language,
} from "../../../../../recoil/readStore";
import Typography from "../../../../../styles/__ready/Typography";
import useAdminAdd_Product from "../../../../../helper/admin_add_product_label/control_product_dynamic_input";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  clearErr,
  getProductLink,
} from "../../../../../redux/product/product_slice";
//this component havent value and onChange
export default function () {
  const dispatch = useDispatch();
  const productLink = useSelector(getProductLink);
  const cssClass = useDynamicCssClass();
  function handleChangeProductLink(event) {
    const value = event.target.value;

    const payload = {
      type: "ADD/LINK",
      // lan,
      value,
    };
    const clearErrPayload = {
      type: "LINK",
    };
    dispatch(addProduct(payload));
    dispatch(clearErr(clearErrPayload));
  }
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .rowThree;

  return (
    <div className="mt-4_5 ">
      <Typography.H8 className={"font-400 mb-1 " + cssClass.ms_3}>
        {content.ProductLinkOnTheSite}
      </Typography.H8>
      <TextFieldFUN_ClipBoardBadge
        className=""
        value={productLink.value}
        onChange={(event) => handleChangeProductLink(event)}
      />
      <Typography.H9 className="color_danger">
        {productLink.validateErr}
      </Typography.H9>
    </div>
  );
}
