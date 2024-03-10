import { Grid } from "@mui/material";

import Buttons from "../../../styles/__ready/Buttons";
import Typography from "../../../styles/__ready/Typography";
import { useTranslation } from "react-i18next";

export default function ({ onClick }) {
  const { t } = useTranslation();
  return (
    <div
      onClick={onClick}
      className="w-100 mt-8 d-flex justify-content-center align-item-center"
    >
      <Buttons.Contained className=" button_large " form="login-box">
        <Typography.H6 className=" font-200 ">{t("login.enter")}</Typography.H6>
      </Buttons.Contained>
    </div>
  );
}
