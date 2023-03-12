import { Grid } from "@mui/material";
import useAdmin_Add_Product from "../../../../../../controller/Admin-add-product-label/useAdmin_Add_Product";

import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
import Buttons from "../../../../../../styles/__ready/Buttons";
import { TextFieldFUN_v5 } from "../../../../../../styles/__ready/Textfields";

import Typography from "../../../../../../styles/__ready/Typography";
import Header from "./Header";
import RowFive from "./RowFive";
import RowFour from "./RowFour";
import RowOne from "./RowOne";
import RowThree from "./RowThree";
import RowTwo from "./RowTwo";

export default function () {
  const { produnctName, handleSubmit_FirstPage, additionalInfo } =
    useAdmin_Add_Product();
  const {
    productHandler,
    productValue,
    handleSetLanguage_Of_ProductName_Header_Card,
    headerCardCurrentBackground,
  } = produnctName;
  const {
    handleSetLanguage_Of__AdditionalInfo_Header_Card,
    additionalInfoHandeler,
    additionalInfoValue,
    AdditionalInfo_headerCardCurrentBackground,
  } = additionalInfo;
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label;

  return (
    <div className="w-100 scrollable3 ">
      <Header />
      <Grid container className={"mt-3 " + cssClass.ps_6}>
        <Grid item lg={12} className="">
          <RowOne />
        </Grid>
        <Grid item lg={12} className="height">
          <RowTwo
            param={{
              productHandler,
              productValue,
              headerCardCurrentBackground,
              handleSetLanguage_Of_ProductName_Header_Card,
            }}
          />
        </Grid>
        <Grid item lg={12} className="height ">
          <RowThree />
        </Grid>

        <Grid item lg={12} className="grid-height">
          <RowFour
            worker={{
              handleSetLanguage_Of__AdditionalInfo_Header_Card,
              additionalInfoHandeler,
              additionalInfoValue,
              AdditionalInfo_headerCardCurrentBackground,
            }}
          />
        </Grid>
      </Grid>
      <article className="w-100 d-flex justify-content-end">
        <Buttons.Contained
          onClick={handleSubmit_FirstPage}
          className="button_large"
        >
          <Typography.H7 className="font-400">ادامه</Typography.H7>
        </Buttons.Contained>
      </article>
    </div>
  );
}
