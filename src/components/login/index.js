import { Grid } from "@mui/material";

export default function () {
  return (
    <Grid container className="d-flex justify-content-center ">
      <Grid item lg={10} md={9} sm={12} xs={12}>
        <div className="w-100"></div>
      </Grid>
    </Grid>
  );
}
