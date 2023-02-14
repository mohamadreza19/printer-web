import { Grid } from "@mui/material";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../recoil/readStore";
import Textfields from "../../../styles/__ready/Textfields";
import Typography from "../../../styles/__ready/Typography";
import RememberPassword from "./RememberPassword";
export default function () {
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  const UsernameBox = () => {
    return (
      <div className="d-flex flex-column mb-3">
        <Typography.H6>{content.login.textFeilds.userName}</Typography.H6>
        <Textfields.v2
          className="mt-3"
          Input_marginStart_based_Language={cssClass.ms_3}
        />
      </div>
    );
  };
  const PasswordBox = () => {
    return (
      <div className="d-flex flex-column mt-4">
        <Typography.H6>{content.login.textFeilds.password}</Typography.H6>
        <Textfields.v2_password
          className="mt-3"
          Input_marginStart_based_Language={cssClass.ms_3}
        />
      </div>
    );
  };
  return (
    <Grid container className="mt-8 d-flex justify-content-center ">
      <Grid item lg={7} md={10} sm={10} xs={10}>
        <div className="w-100 ">
          <UsernameBox />
          <PasswordBox />
          <RememberPassword />
        </div>
      </Grid>
    </Grid>
  );
}
