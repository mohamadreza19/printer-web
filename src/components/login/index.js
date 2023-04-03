import { Grid } from "@mui/material";
import { useDynamicCssClass } from "../../recoil/readStore";
import FooterButton from "./layout/FooterButton";
import Header from "./layout/Header";
import RememberPassword from "./layout/RememberPassword";
import SelectedLanguage from "./layout/SelectedLanguage";
import Slider from "./layout/Slider";
import TextfiledsBox from "./layout/TextfiledsBox";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <Grid container className={"bg_secondray  vh100"}>
      <Grid
        item
        lg={6}
        md={6}
        sm={12}
        xs={12}
        className={
          cssClass.border_r_e_50px +
          " bg_info py-4 h-100 d-flex flex-column justify-content-between"
        }
      >
        <Header />
        <TextfiledsBox />
        <FooterButton />

        <SelectedLanguage />
      </Grid>
      <Grid className="h-100  bg_secondray " item lg={6} md={6}>
        <Slider />
      </Grid>
    </Grid>
  );
}
