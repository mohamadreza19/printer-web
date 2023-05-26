import { useState } from "react";
import useAdmin_Add_Label from "../../../../../helper/admin_add_product_label/control_label_dynamic_input";
import validate_label from "../../../../../helper/admin_add_product_label/validate_label";

import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Typography from "../../../../../styles/__ready/Typography";
import Header from "./Header";
import RowOne from "./RowOne";
import RowTwo from "./RowTwo";
import { Grid } from "@mui/material";
import UploadFile from "./uploadFile";
import SuccessBox from "./SuccessBox";
export default function () {
  const { labelName } = useAdmin_Add_Label();
  labelName.showState();
  const handleValidate = validate_label();
  const cssClass = useDynamicCssClass();
  const [allowNextUpload, setAllowNextUpload] = useState(false);
  async function submit() {
    try {
      await handleValidate();

      setAllowNextUpload(true);
    } catch (error) {}
  }
  if (allowNextUpload) return <UploadFile />;
  return (
    <div className="w-100 ">
      <Header />
      <Grid container className={"mt-5 " + cssClass.ps_6}>
        <Grid item lg={12} md={12} sm={12}>
          <RowOne />
        </Grid>
        <Grid item lg={12} md={12} sm={12} className="height">
          <RowTwo />
        </Grid>
      </Grid>
      <footer className="w-100 mt-17-9rem d-flex justify-content-end pb-4 px-4">
        <Buttons.Contained className="button_large" onClick={submit}>
          <Typography.H7 className="font-300">ادامه</Typography.H7>
        </Buttons.Contained>
      </footer>
    </div>
  );
}
