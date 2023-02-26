import { Grid } from "@mui/material";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import useCachedLanguage from "../../../../../utility/useCachedLanguage";

export default function () {
  const cssClass = useDynamicCssClass();
  const { value: currentLanguage } = useCachedLanguage();
  const content = useContent_Based_Language();
  const StartGrid = () => {
    const changedPostion = {
      first: currentLanguage == "fa" ? "1.5rem" : "-1.5rem",
      second: currentLanguage == "fa" ? "2rem" : "-2rem",
    };
    const TimeBox = () => {
      return (
        <section className="d-flex">
          <span
            style={{
              position: "relative",
              right: changedPostion.first,
            }}
            className="d-flex"
          >
            <Typography.H10>چند دقیقه پیش</Typography.H10>
          </span>
          <span
            style={{
              position: "relative",
              right: changedPostion.second,
            }}
            className="d-flex"
          >
            {" "}
            <Typography.H10 className="ms-3" language={currentLanguage}>
              18:58
            </Typography.H10>
          </span>
        </section>
      );
    };
    return (
      <Grid item lg={6} className="d-flex justify-content-between">
        <Typography.H10>شرکت تجهیز صنعت پاسارگاد</Typography.H10>
        <TimeBox />
      </Grid>
    );
  };
  const EndGrid = () => {
    const changedPostion = {
      first: currentLanguage == "fa" ? "7.5rem" : "-10rem",
      second: currentLanguage == "fa" ? "0rem" : "-2rem",
    };
    return (
      <Grid item lg={6} className="d-flex justify-content-end pe-5">
        <section className="d-flex">
          <span
            style={{
              position: "relative",
              left: changedPostion.first,
            }}
          >
            <Typography.H10 language={currentLanguage}>
              21
              <span className={cssClass.ms_1}>
                {content.AdminPannel.end_col.controlPannel.row3.product}
              </span>
            </Typography.H10>
          </span>
          <span
            style={{
              position: "relative",
              left: changedPostion.second,
            }}
          >
            <Typography.H10 language={currentLanguage}>
              21
              <span className={cssClass.ms_1}>
                {content.AdminPannel.end_col.controlPannel.row3.print}
              </span>
            </Typography.H10>
          </span>
        </section>
      </Grid>
    );
  };
  return (
    <div className="w-100 bg_primary_v1 d-flex  border-r-25   mb-2 cur-pointer">
      <Grid
        style={{
          height: "62px",
          borderRadius: "24px",
        }}
        container
        className="w-100 d-flex justify-content-between align-items-center bg-white border  px-3 py-3  "
      >
        <StartGrid />
        <EndGrid />
      </Grid>
      <section className={"d-flex align-items-center "}>
        <Icons.LeftArrow
          className="icon_mx-0_6rem"
          language={currentLanguage}
        />
      </section>
    </div>
  );
}
