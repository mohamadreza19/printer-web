import { Grid } from "@mui/material";
import EndColumn from "./layout/endColumn";
import StartColumn from "./layout/startColumn";
import IconBox from "./layout/startColumn/IconBox";

export default function () {
  return (
    <Grid container className="w-100 vh-100 ">
      <Grid className="bg_secondray h-100 " item lg={1}>
        <StartColumn />
      </Grid>
      <Grid className="bg_secondray h-100 " item lg={11}>
        <EndColumn />
      </Grid>
    </Grid>
  );
}
