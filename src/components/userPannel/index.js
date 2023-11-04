import { Grid } from "@mui/material";
import EndColumn from "./layout/endColumn";
// import StartColumn from "./layout/startColumn";
import StartColumn from "./layout/startColumn/index";
import { Outlet } from "react-router-dom";
import { User_Profile_Call } from "../../reactQuery/user/callGetService";
import { useEffect } from "react";
import { useSetAdminProfile } from "../../recoil/store/admin/profile";
import useLocalStorage from "react-use-localstorage";
export default function () {
  const user_profile = User_Profile_Call();
  const [editor_access, setEditor_access] = useLocalStorage("editor_access");
  const setProfile = useSetAdminProfile();
  useEffect(() => {
    if (user_profile.isSuccess) {
      if (!("role" in user_profile.data)) {
        setEditor_access("project/edit");
      }
      setProfile(user_profile.data);
    }
  }, [user_profile.isSuccess]);

  return (
    <Grid
      container
      className="bg_secondray vh100 "
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
