import { TextFieldFUN_ClipBoardBadge } from "../../../../../../styles/__ready/Textfields";
import {
  useDynamicCssClass,
  useContent_Based_Language,
} from "../../../../../../recoil/readStore";
import Typography from "../../../../../../styles/__ready/Typography";
import useAdminAdd_Product from "../../../../../../helper/admin_add_product_label/control_product_dynamic_input";
import { useEffect } from "react";
//this component havent value and onChange
export default function ({ res }) {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .rowThree;
  const { productLinkValue, handeler, validateErr } =
    useAdminAdd_Product("productLink");

  useEffect(() => {
    if (res.isSuccess) {
      console.log(res);

      let e = {
        target: {
          value: "",
        },
      };

      e.target.value = res.data.link;

      handeler(e);
    }
  }, [res.isSuccess]);
  useEffect(() => {
    return () => {
      const e = {
        target: {
          value: " ",
        },
      };
      handeler(e);
    };
  }, []);
  if (res.isSuccess)
    return (
      <div className="mt-4_5 ">
        <Typography.H8 className={"font-400 mb-1 " + cssClass.ms_3}>
          {content.ProductLinkOnTheSite}
        </Typography.H8>
        <TextFieldFUN_ClipBoardBadge
          className=""
          value={productLinkValue}
          onChange={handeler}
        />
        <Typography.H9 className="color_danger">{validateErr}</Typography.H9>
      </div>
    );
}
