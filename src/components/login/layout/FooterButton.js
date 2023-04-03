import { Grid } from "@mui/material";
import { useContent_Based_Language } from "../../../recoil/readStore";
import Buttons from "../../../styles/__ready/Buttons";
import Typography from "../../../styles/__ready/Typography";

export default function () {
  const { login } = useContent_Based_Language();

  return (
    <div className="w-100 ">
      {/* <div className="w-100 mt-8"> */}
      <Grid container className={"d-flex justify-content-center "}>
        <Grid item lg={3} md={5} sm={10} xs={10}>
          <Buttons.Contained className=" button_large ">
            <Typography.H6 className=" font-200 ">
              {login.enterButton}
            </Typography.H6>
          </Buttons.Contained>
        </Grid>
      </Grid>
    </div>
  );
}
