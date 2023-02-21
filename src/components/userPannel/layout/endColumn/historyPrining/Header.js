import Typography from "../../../../../styles/__ready/Typography";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore/index";
import Icons from "../../../../../styles/__ready/Icons";
import TextFields from "../../../../../styles/__ready/Textfields";
import { Grid } from "@mui/material";
export default function () {
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  return (
    <Grid container className="w-100">
      <Grid item lg={6} className="d-flex align-items-center">
        <Icons.History classNameForPath="fill_black" />
        <Typography.H9 className={cssClass.ms_1 + " font-500"}>
          {content.userPannel.start_col.row2.historyOfPrinting}
        </Typography.H9>
      </Grid>
      <Grid item lg={6} className="d-flex align-items-center">
        <TextFields.v2_SearchBox
          Input_marginStart_based_Language={cssClass.ms_1}
          placeholder={content.userPannel.end_col.labelList.searchPlaceHolder}
        />
      </Grid>
    </Grid>
  );
}
