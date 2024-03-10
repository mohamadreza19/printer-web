import Typography from "../../../../../styles/__ready/Typography";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore/index";
import Icons from "../../../../../styles/__ready/Icons";
import TextFields from "../../../../../styles/__ready/Textfields";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function ({ setSearch }) {
  const { t } = useTranslation();
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  return (
    <Grid container className="w-100 px-4">
      <Grid item lg={6} className="d-flex align-items-center">
        <Icons.History classNameForPath="fill_black" />
        <Typography.H9 className={cssClass.ms_1 + " font-500"}>
          {t("histroyOfPrinting.histroyOfPrinting")}
        </Typography.H9>
      </Grid>
      <Grid item lg={6} className="d-flex align-items-center">
        <TextFields.v2_SearchBox
          onClickAndGetValeFn={setSearch}
          Input_marginStart_based_Language={cssClass.ms_1}
          placeholder={t("histroyOfPrinting.searchProjectOrPrintedLabel")}
        />
      </Grid>
    </Grid>
  );
}
