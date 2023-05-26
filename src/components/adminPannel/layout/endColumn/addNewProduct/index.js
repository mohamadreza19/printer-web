import { Grid } from "@mui/material";
import useAdmin_Add_Product from "../../../../../helper/admin_add_product_label/control_product_dynamic_input";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Typography from "../../../../../styles/__ready/Typography";
//
import Header from "./Header";
import RowFour from "./RowFour";
import RowOne from "./RowOne";
import RowThree from "./RowThree";
import RowTwo from "./RowTwo";
import UploadFile from "./uploadFile";
//__v
import useValidateproduct from "../../../../../helper/admin_add_product_label/validate_product";
import { useState } from "react";

export default function () {
  const [allowNextFlow, setAllowNextFlow] = useState(false);
  const allInput = useAdmin_Add_Product();

  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label;
  const handleProductNameValidate = useValidateproduct();
  async function handle() {
    try {
      await handleProductNameValidate();
      setAllowNextFlow(true);
    } catch (error) {}
  }
  if (allowNextFlow) {
    return <UploadFile />;
  }
  return (
    <div
      className="w-100 h-100
    
    "
      style={{ overflowY: "auto" }}
    >
      <Header />
      <Grid container className={"mt-5 " + cssClass.ps_6}>
        <Grid item lg={12} className="">
          <RowOne />
        </Grid>
        <Grid item lg={12} className="height">
          <RowTwo />
        </Grid>
        <Grid item lg={12} className="height ">
          <RowThree />
        </Grid>

        <Grid item lg={12} className="grid-height">
          <RowFour />
        </Grid>
      </Grid>
      <footer className="w-100 d-flex justify-content-end px-4">
        <Buttons.Contained onClick={handle} className="button_large">
          <Typography.H7 className="font-300">ادامه</Typography.H7>
        </Buttons.Contained>
      </footer>
    </div>
  );
}
