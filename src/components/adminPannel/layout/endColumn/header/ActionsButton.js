import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

import Buttons from "../../../../../styles/__ready/Buttons";
import { useRecoilValue } from "recoil";
import { adminRole } from "../../../../../recoil/recoilStore";
import { Link } from "react-router-dom";

export default function () {
  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();
  const role = useRecoilValue(adminRole);
  const AddNewAdmin = () => {
    if (role === "superAdmin")
      return (
        <div className="mx-2">
          <Link to={"/admin/control-pannel/add-admin"}>
            <Buttons.Outlined>
              <Icons.AdminAvatar />
              <Typography.Button className={cssClass.ms_1}>
                {content.AdminPannel.end_col.row1.add_new_admin}
              </Typography.Button>
            </Buttons.Outlined>
          </Link>
        </div>
      );
  };
  const FileUpload = () => {
    return (
      <div>
        <Buttons.Outlined>
          <Icons.UploadFile />
          <Typography.Button className={cssClass.ms_1}>
            {content.userPannel.end_col.row1.fileUpload}
          </Typography.Button>
        </Buttons.Outlined>
      </div>
    );
  };
  return (
    <div className="d-flex w-100">
      <FileUpload />
      <AddNewAdmin />
    </div>
  );
}
