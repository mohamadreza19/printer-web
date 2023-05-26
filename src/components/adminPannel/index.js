import { Grid } from "@mui/material";
import EndColumn from "./layout/endColumn/index";
// import StartColumn from "./layout/startColumn";
import StartColumn from "./layout/startColumn/index";
import { Outlet } from "react-router-dom";
export default function () {
  return (
    <Grid
      container
      className="bg_secondray vh-100  "
      style={{
        // minHeight: () => {},
        minHeight: "768px",
        // maxHeight: "768px",
        // minWidth: "1366px",
        // maxWidth: "768px",
      }}
    >
      <Grid item lg={3} className="">
        <StartColumn />
      </Grid>
      <Grid item lg={9}>
        <EndColumn />
      </Grid>
    </Grid>
  );
}
