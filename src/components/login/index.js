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
    <Grid container className={"bg_secondray + vh100"}>
      <Grid
        item
        lg={6}
        md={6}
        sm={12}
        xs={12}
        className={cssClass.border_r_e_50px + " bg_info py-4 "}
      >
        <Header />
        <TextfiledsBox />
        <FooterButton />

        <SelectedLanguage />
      </Grid>
      <Grid className="bg_secondray " item lg={6} md={6}>
        <Slider />
      </Grid>
    </Grid>
  );
}
