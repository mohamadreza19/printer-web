import { useRecoilState } from "recoil";
import {
  productLink_store,
  productName_store,
  width_store,
} from "../../../recoil/store/admin_add_product_label/add_product_store";
import useAdminAdd_Product from "../control_product_dynamic_input";
import add_Product_validation from "../../../validation/admin/add_product_label/add_Product_validation";
import { useLanguage } from "../../../recoil/readStore";
export default function () {
  //this function validate product and  add validate message to state

  const [productName, setProductName] = useRecoilState(productName_store);
  const [productLink, SetProductLink] = useRecoilState(productLink_store);

  const state = useAdminAdd_Product();

  const langugae = useLanguage();
  async function handleValidation() {
    try {
      await add_Product_validation(state, langugae);
    } catch (error) {
      // console.table(error.inner);
      // error.inner

      error.inner.forEach((err) => {
        // path : productName.persian  > persion
        const feild = err.path.split(".")[0];
        if (feild === "productName") {
          setProductName((draft) => ({ ...draft, validateErr: err.message }));
        }
        if (feild === "productLink") {
          SetProductLink((draft) => ({ ...draft, validateErr: err.message }));
        }
      });

      throw "error";
    }
  }

  return handleValidation;
}
