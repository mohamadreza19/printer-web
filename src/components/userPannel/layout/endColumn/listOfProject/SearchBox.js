import { Grid } from "@mui/material";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import TextFields from "../../../../../styles/__ready/Textfields";
export default function ({ setSearch = () => {} }) {
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  return (
    <Grid container className="w-100 d-flex border-bottom-gray pb-2_5  px-4">
      <Grid item xs={6} className="d-flex">
        <div className="d-flex align-item-center">
          <Icons.List className="fill_black " />
          <Typography.H8 className={cssClass.ms_1 + " font-500"}>
            {content.userPannel.start_col.row2.listOfProjects}
          </Typography.H8>
        </div>
      </Grid>
      <Grid xs={6} item className=" ">
        <div className={" w-90 " + cssClass.ms_auto}>
          <TextFields.v2_SearchBox
            onClickAndGetValeFn={setSearch}
            placeholder={content.userPannel.end_col.row2.searchPlaceHolder}
          />
        </div>
      </Grid>
    </Grid>
  );
}
