import Icons from "../../../../styles/__ready/Icons";
import Typography from "../../../../styles/__ready/Typography";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../recoil/readStore/index";
import { useLogOut } from "../../../../utility/useLogOut";
export default function ({ singOut }) {
  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();
  const logOut = useLogOut();
  return (
    <div
      className={"px-3  w-100  d-flex cur-pointer"}
      onClick={() => logOut("user")}
    >
      <Icons.SingOut />
      <Typography.H7 className={"color_danger text-upercase " + cssClass.ms_2}>
        {content.userPannel.start_col.row3}
      </Typography.H7>
    </div>
  );
}
