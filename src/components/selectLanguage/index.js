import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../recoil/readStore";

import {
  flexClass,
  flexModel_1,
  heightClass,
  rootClass,
  widthClass,
} from "../../styles/cssClass";

import { Grid } from "@mui/material";

import Icon_A_TextBox from "./layouts/Icon_A_TextBox";
import ButtonsBox from "./layouts/ButtonsBox";

export default function () {
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();

  return (
    <Grid container className={rootClass + heightClass.h_100vh + flexModel_1}>
      <Grid item lg={4} md={5}>
        <div
          className="w-100 border  p-lg-4 p-md-2 border-12"
          style={{
            maxWidth: 400,
          }}
        >
          <Icon_A_TextBox text={content.selectedLanguage.text} />
          <ButtonsBox
            startButtonText={content.selectedLanguage.startButtonText}
            endButtonText={content.selectedLanguage.endButtonText}
          />
        </div>
      </Grid>
    </Grid>
  );
}
