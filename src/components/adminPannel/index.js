import { Grid } from "@mui/material";
import EndColumn from "./layout/endColumn/index";
// import StartColumn from "./layout/startColumn";
import StartColumn from "./layout/startColumn/index";
import { Outlet } from "react-router-dom";
import { Admin_Profile_Call } from "../../reactQuery/admin/callGetService";
import { useSetAdminProfile } from "../../recoil/store/admin/profile";
import { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
export default function () {
  const res = Admin_Profile_Call();
  const setAdminProfile = useSetAdminProfile();
  const [editor_access, setEditor_access] = useLocalStorage("editor_access");
  useEffect(() => {
    if (res.isSuccess) {
      if ("role" in res.data) {
        setEditor_access("project-templates/edit");
      }
      setAdminProfile(res.data);
      console.log(res.data);
    }
  }, [res.isSuccess]);
  console.log({ editor_access });
  return (
    <Grid
      container
      className="bg_secondray  vh100"
      style={{
        // minHeight: () => {},
        minHeight: "768px",
        // height: "768px",
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
