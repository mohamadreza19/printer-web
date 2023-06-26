import { Grid } from "@mui/material";
import EndColumn from "./layout/endColumn";
import StartColumn from "./layout/startColumn";

import { useEffect } from "react";
import { setUser_project_findOne } from "../../../../../../reactQuery/querykey/user_key";

export default function () {
  useEffect(() => {
    return () => {
      setUser_project_findOne();
    };
  }, []);
  return (
    <Grid
      container
      className="w-100 vh-100 "
      style={{
        minHeight: "768px",
      }}
    >
      <Grid className="bg_secondray h-100 " item lg={1}>
        <StartColumn />
      </Grid>
      <Grid className="bg_secondray h-100 " item lg={11}>
        <EndColumn />
      </Grid>
    </Grid>
  );
}
