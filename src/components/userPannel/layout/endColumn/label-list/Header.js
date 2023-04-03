import { Grid } from "@mui/material";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import TextFields from "../../../../../styles/__ready/Textfields";
export default function ({
  content = {
    labelList: " ",
    selectedLabelButton: " ",
    searchPlaceHolder: " ",
  },
  margin = { ms_1: " ", ms_2: " ", ms_auto: " " },
  padding = { pe_1: " ", pe_2: " " },
}) {
  return (
    <header className="w-100  px-4">
      <Grid container className="border-bottom-gray pb-3">
        <Grid item lg={6} className="d-flex">
          <div className={"w-100 d-flex align-items-center " + padding.pe_1}>
            <Icons.Labels classNameForPath="fill_black" />
            <Typography.H8 className={"font-500 " + margin.ms_2}>
              {content.labelList}
            </Typography.H8>
            {/* // */}
            <Buttons.Outlined className={margin.ms_auto}>
              <Icons.Star1 />
              <Typography.Button className={margin.ms_1}>
                {content.selectedLabelButton}
              </Typography.Button>
            </Buttons.Outlined>
          </div>
        </Grid>
        <Grid item lg={6}>
          <div className="w-100 d-flex align-item-center">
            <TextFields.v2_SearchBox
              placeholder={content.searchPlaceHolder}
              Input_marginStart_based_Language={margin.ms_1}
            />
          </div>
        </Grid>
      </Grid>
    </header>
  );
}
