import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
import { AdminRoutePath } from "../../../../../../routes/Routes";
import Buttons from "../../../../../../styles/__ready/Buttons";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();
  return (
    <Grid container className="border-bottom px-4 pb-3 mb-3">
      <Grid item lg={5} className="d-flex align-items-center">
        <Icons.History classNameForPath="fill_black" />
        <Typography.H8 className={"font-500 " + cssClass.ms_1}>
          {content.userPannel.start_col.row2.historyOfPrinting}
        </Typography.H8>
      </Grid>
      <Grid item lg={7} className="d-flex align-items-center ">
        <Typography.H8 className={"disabled_gray2 font-400 " + cssClass.me_3}>
          {content.AdminPannel.end_col.controlPannel.row2.latestUpdate}: 5 دقیقه
          پیش
        </Typography.H8>

        <Buttons.Outlined_Custom className="button_medium ">
          <Typography.H8>
            {content.AdminPannel.end_col.controlPannel.row2.update}
          </Typography.H8>
        </Buttons.Outlined_Custom>
        <Buttons.Contained_Custom
          className={"button_medium bg_primary " + cssClass.ms_auto}
        >
          <Typography.H8 className="font-400">
            <Link to={AdminRoutePath.controlPannel}>
              {content.AdminPannel.end_col.controlPannel.history.backToPannel}
            </Link>
          </Typography.H8>
        </Buttons.Contained_Custom>
      </Grid>
    </Grid>
  );
}
