import { Grid } from "@mui/material";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import { Link } from "react-router-dom";
import { AdminRoutePath } from "../../../../../routes/Routes";
import { useState } from "react";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import useFormetDate from "../../../../../utility/useFormetDate";
import { useRef } from "react";
import { setProduct_label_key } from "../../../../../reactQuery/querykey/admin_key";
export default function () {
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  const [startTime, setstartTime] = useState(null);
  const [nowTime, setTime] = useState(null);
  const language = useLanguage();

  const fromNowDate = useFormetDate(nowTime, language);
  const watchNow_interval_ref = useRef(null);
  useEffect(() => {
    const time = Date.now();
    setstartTime(time);
    setTime(time);

    return () => {
      clearInterval(watchNow_interval_ref.current);
    };
  }, []);
  useEffect(() => {
    watchNow_interval_ref.current = setInterval(() => {
      setTime(startTime);
    }, 20000);
  }, [startTime]);

  function updateProjectlist() {
    setProduct_label_key(Math.random() * 10);
    const time = Date.now();
    setTime(time);
  }

  return (
    <Grid container className="border-bottom pb-3 ">
      <Grid item lg={5} className="d-flex align-items-center">
        <Icons.History classNameForPath="fill_black" />
        <Typography.H8 className={"font-500 " + cssClass.ms_1}>
          {content.userPannel.start_col.row2.historyOfPrinting}
        </Typography.H8>
      </Grid>
      <Grid item lg={7} className="d-flex align-items-center ">
        <Typography.H8 className={"disabled_gray2 font-400 " + cssClass.me_3}>
          {content.AdminPannel.end_col.controlPannel.row2.latestUpdate}:{" "}
          {fromNowDate}
        </Typography.H8>

       
        <Buttons.Outlined_Custom
          onClick={updateProjectlist}
          className={"button_medium  " + cssClass.me_1}
        >
          <Typography.H8>
            {content.AdminPannel.end_col.controlPannel.row2.update}
          </Typography.H8>
        </Buttons.Outlined_Custom>
        <Buttons.Contained_Custom
          className={"button_medium   bg_primary " + cssClass.ms_auto}
        >
          <Typography.H8>
            <Link to={AdminRoutePath.controlPannel_History}>
              {content.AdminPannel.end_col.controlPannel.row2.viewAll}
            </Link>
          </Typography.H8>
        </Buttons.Contained_Custom>
      </Grid>
    </Grid>
  );
}
