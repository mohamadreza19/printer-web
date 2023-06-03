import { Grid } from "@mui/material";
import { useDynamicCssClass } from "../../../../../../recoil/readStore";
import {
  TextFieldFUN_v4,
  TextFieldFUN_v5,
} from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";
import CreatedPrinters from "./CreatedPrinters";

import Buttons from "../../../../../../styles/__ready/Buttons";

import Header from "./Header";

export default function () {
  const cssClass = useDynamicCssClass();
  const AccessProductBox = () => {
    const changedJustify = true
      ? "justify-content-start"
      : "justify-content-end";
    const changedBackGround = true ? "#F36523" : "rgb(238 170 139)";
    return (
      <div
        style={{
          width: "62px",
          height: "36px",
          backgroundColor: "#FBD1BD",
          borderRadius: "18px",
        }}
        className={"mt-1 d-flex align-item-center  dir-rtl " + changedJustify}
      >
        <span
          //   onClick={handleToggleAccessProduct}
          style={{
            width: "29.95px",
            height: "29.95px",
            backgroundColor: changedBackGround,
            borderRadius: "18px",
          }}
          className="transition-all-v1  "
        ></span>
      </div>
    );
  };
  return (
    <div className="w-100 px-4">
      <Header />
      <CreatedPrinters />
      <Grid
        container
        className={"d-flex mt-4 px-5 " + cssClass.ps_6}
        rowSpacing={2}
        columnSpacing={2.5}
      >
        <Grid item lg={12}>
          <Typography.H8 className="font-500">افزودن پرینتر جدید</Typography.H8>
        </Grid>
        <Grid item lg={6}>
          <Typography.H8 className={"mb-1 " + cssClass.ms_2}>
            نام پرینتر
          </Typography.H8>
          <TextFieldFUN_v4 />
        </Grid>
        <Grid item lg={6}>
          <Typography.H8 className={"mb-1 " + cssClass.ms_2}>
            مدل پرینتر
          </Typography.H8>
          <TextFieldFUN_v4 />
        </Grid>
        <Grid item lg={6}>
          <Typography.H8 className={"mb-1 " + cssClass.ms_2}>
            سریال پرینتر
          </Typography.H8>
          <TextFieldFUN_v4 />
        </Grid>
        <Grid item lg={6}>
          <Typography.H8 className={"mb-1 " + cssClass.ms_2}>Mac</Typography.H8>
          <TextFieldFUN_v4 />
        </Grid>
        <Grid item lg={6}>
          <Typography.H8 className={"mb-1 " + cssClass.ms_2}>
            پورت اتصال
          </Typography.H8>
          <TextFieldFUN_v4 />
        </Grid>
        <Grid
          item
          lg={6}
          style={{
            top: "0.5rem",
          }}
          className="d-flex align-items-center position-relative"
        >
          <AccessProductBox />
          <Typography.H8 className={cssClass.ms_2}>
            وضعیت فعال بودن
          </Typography.H8>
        </Grid>
      </Grid>
      <footer className="w-100 d-flex justify-content-end py-3">
        <Buttons.Contained_Custom className="button_large bg_primary">
          <Typography.H7 className="font-300">افزودن پرینتر</Typography.H7>
        </Buttons.Contained_Custom>
      </footer>
    </div>
  );
}
