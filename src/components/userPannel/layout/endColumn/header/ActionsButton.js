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
  const SupportButton = () => {
    return (
      <div>
        <Buttons.Outlined>
          <Icons.Support />
          <Typography.Button className={cssClass.ms_1}>
            {content.login.header.supportButton}
          </Typography.Button>
        </Buttons.Outlined>
      </div>
    );
  };
  const AskedQuestion = () => {
    return (
      <div className="mx-2">
        <Buttons.Outlined>
          <Icons.Union />
          <Typography.Button className={cssClass.ms_1}>
            {content.userPannel.end_col.row1.frequently_asked_questions}
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
      <SupportButton />
      <AskedQuestion />
      <FileUpload />
    </div>
  );
}
