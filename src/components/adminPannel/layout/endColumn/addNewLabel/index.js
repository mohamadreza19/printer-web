import { Grid } from "@mui/material";
import useAdmin_Add_Label from "../../../../../controller/Admin-add-product-label/useAdmin_Add_Label";
import useAdmin_Add_Product from "../../../../../controller/Admin-add-product-label/useAdmin_Add_Product";
import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Typography from "../../../../../styles/__ready/Typography";
import Header from "./Header";
import RowOne from "./RowOne";
import RowTwo from "./RowTwo";

export default function () {
  const { labelName } = useAdmin_Add_Label();
  const {
    labelValue,
    labelHandler,
    handleSetLanguage_Of_LabelName_Header_Card,
    headerCardCurrentBackground,
  } = labelName;
  const cssClass = useDynamicCssClass();
  return (
    <div className="w-100 px-4">
      <Header />
      <Grid container className={"mt-3 " + cssClass.ps_6}>
        <Grid item lg={12}>
          <RowOne />
        </Grid>
        <Grid item lg={12} className="height">
          <RowTwo
            param={{
              labelValue,
              labelHandler,
              handleSetLanguage_Of_LabelName_Header_Card,
              headerCardCurrentBackground,
            }}
          />
        </Grid>
      </Grid>
      <footer className="w-100 mt-17-9rem d-flex justify-content-end pb-5 px-4">
        <Buttons.Contained
          //   onClick={handleSubmit_FirstPage}
          className="button_large"
        >
          <Typography.H7 className="font-400">ادامه</Typography.H7>
        </Buttons.Contained>
      </footer>
    </div>
  );
}
