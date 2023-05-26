import { useRecoilState } from "recoil";

import useAdminAdd_Label from "../control_label_dynamic_input/";
import add_Label_validation from "../../../validation/admin/add_product_label/add_label_validation";
import { labelName_store } from "../../../recoil/store/admin_add_product_label/add_label_store";
export default function () {
  //this function validate label and  add validate message to state

  const [labelName, setLabelName] = useRecoilState(labelName_store);

  const label = useAdminAdd_Label();
  async function handleValidation() {
    try {
      await add_Label_validation(label.labelName.showState());
    } catch (error) {
      // console.table(error.inner);
      // error.inner

      error.inner.forEach((err) => {
        setLabelName((draft) => ({ ...draft, validateErr: err.message }));
      });
      throw new Error("validate err");
    }
  }

  return handleValidation;
}
