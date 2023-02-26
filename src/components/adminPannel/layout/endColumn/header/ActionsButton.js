import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

import Buttons from "../../../../../styles/__ready/Buttons";

export default function () {
  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();
  const AddNewAdmin = () => {
    return (
      <div className="mx-2">
        <Buttons.Outlined>
          <Icons.AdminAvatar />
          <Typography.Button className={cssClass.ms_1}>
            {content.AdminPannel.end_col.row1.add_new_admin}
          </Typography.Button>
        </Buttons.Outlined>
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
