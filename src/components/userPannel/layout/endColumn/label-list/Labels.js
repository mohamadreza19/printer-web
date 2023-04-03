import { Grid } from "@mui/material";
import Label from "./Label";

export default function () {
  return (
    <div
      style={{
        maxHeight: "32rem",
        // overflow: "auto",
        overflowY: "scroll",
      }}
      //   className="w-100 mt-2"
      className="w-100 px-4 mt-4"
    >
      <Grid container rowSpacing={"0.9rem"}>
        {/* <Grid item lg={3}>
          <Label />
        </Grid> */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(() => (
          <Grid item lg={3}>
            <Label />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
