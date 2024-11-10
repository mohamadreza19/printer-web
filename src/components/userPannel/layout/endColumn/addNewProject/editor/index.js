import { Grid } from "@mui/material";
import EndColumn from "./layout/endColumn";
import StartColumn from "./layout/startColumn";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import useLocalStorage from "react-use-localstorage";
import SuccessBox from "../../../../../../common/SuccessBox";
import useEditor from "../../../../../../modules/useEditor";
import { setUser_project_findOne } from "../../../../../../reactQuery/querykey/user_key";
import { User_Profile_Call } from "../../../../../../reactQuery/user/callGetService";
import { useSetAdminProfile } from "../../../../../../recoil/store/admin/profile";
import { getEditSussessStatus } from "../../../../../../redux/project/success_slice";
import SelectArea from "../../../../../../utility/editor-tools/useSelectArea";

export default function () {
  const user_profile = User_Profile_Call();
  const setProfile = useSetAdminProfile();
  const [editor_access, setEditor_access] = useLocalStorage("editor_access");
  const successStatus = useSelector(getEditSussessStatus);

  useEditor();
  useEffect(() => {
    if (user_profile.isSuccess) {
      setProfile(user_profile.data);
    }
  }, [user_profile.isSuccess]);
  useEffect(() => {
    return () => {
      setUser_project_findOne();
    };
  }, []);

  if (successStatus === "success") return <SuccessBox />;

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
      <SelectArea />
    </Grid>
  );
}
