import { Grid } from "@mui/material";
import EndColumn from "./layout/endColumn";
// import StartColumn from "./layout/startColumn";
import StartColumn from "./layout/startColumn/index";
import { Outlet } from "react-router-dom";
export default function () {
  return (
    <Grid container className="bg_secondray vh100 ">
      <Grid item lg={3} className="">
        <StartColumn />
      </Grid>
      <Grid item lg={9}>
        <EndColumn />
      </Grid>
    </Grid>
  );
}
