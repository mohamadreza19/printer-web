import { useRecoilState } from "recoil";
import {
  productLink_store,
  productName_store,
} from "../../../recoil/store/admin_add_product_label/add_product_store";
import useAdminAdd_Product_page2 from "../control_product_dynamic_input/index";

import add_Product_pageTwo_validation from "../../../validation/admin/add_product_label/add_Product_pageTwo_validation";
import { useLanguage } from "../../../recoil/readStore";
export default function () {
  //this function validate product and  add validate message to state

  const state = useAdminAdd_Product_page2("none", false, true);
  const meta = useAdminAdd_Product_page2("none", false, false, true);
  const { SetWidth, SetWidthOfPrintingArea, SetPicture } = meta;
  const language = useLanguage();
  async function handleValidation() {
    console.log(meta);
    try {
      let modifiedStete = { ...state };
      delete modifiedStete.additionalInfo;
      delete modifiedStete.name;
      delete modifiedStete.productLink;

      await add_Product_pageTwo_validation(modifiedStete, language);
    } catch (error) {
      console.log(error.inner);

      error.inner.forEach((err) => {
        // console.log(err.path);
        const feild = err.path;
        if (feild === "width") {
          SetWidth((draft) => ({ ...draft, validateErr: err.message }));
        }
        if (feild === "widthOfPrintingArea") {
          console.log(err.path);
          SetWidthOfPrintingArea((draft) => ({
            ...draft,
            validateErr: err.message,
          }));
        }
        if (feild === "picture") {
          SetPicture((draft) => ({
            ...draft,
            validateErr: err.message,
          }));
        }
      });

      throw "error";
    }
  }

  return handleValidation;
}
