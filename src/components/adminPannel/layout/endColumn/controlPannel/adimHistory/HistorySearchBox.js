import { Grid } from "@mui/material";
import Buttons from "../../../../../../styles/__ready/Buttons";
import Typography from "../../../../../../styles/__ready/Typography";
import TextFields from "../../../../../../styles/__ready/Textfields";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";

export default function () {
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  return (
    <Grid container>
      <Grid item lg={6} className="bg_info">
        <Buttons.Contained_Custom className="button bg_primary">
          <Typography.H8 className="font-400 ">
            {content.AdminPannel.end_col.controlPannel.history.allPrints}
          </Typography.H8>
        </Buttons.Contained_Custom>
        <Buttons.Contained_Custom className="button button_contained_v2 mx-3">
          <Typography.H8 className="font-400 ">
            {content.AdminPannel.end_col.controlPannel.history.onlyProducts}
          </Typography.H8>
        </Buttons.Contained_Custom>
        <Buttons.Contained_Custom className="button button_contained_v2">
          <Typography.H8 className="font-400 ">
            {content.AdminPannel.end_col.controlPannel.history.onlyLabels}
          </Typography.H8>
        </Buttons.Contained_Custom>
      </Grid>
      <Grid item lg={6} className={cssClass.ps_2}>
        <TextFields.v2_SearchBox
          Input_marginStart_based_Language={cssClass.ms_1}
          placeholder={
            content.AdminPannel.end_col.controlPannel.history
              .searchBoxPlaceHolder
          }
        />
      </Grid>
    </Grid>
  );
}
