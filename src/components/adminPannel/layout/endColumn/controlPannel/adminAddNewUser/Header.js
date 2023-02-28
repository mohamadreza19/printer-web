import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";
import Buttons from "../../../../../../styles/__ready/Buttons";

export default function () {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.controlPannel.row1
      .AddNewUser;
  return (
    <div className={"w-100 d-flex  border-bottom-gray pb-3 " + cssClass.ms_2}>
      <Icons.AddNewProject classNameForPath="fill_black" />
      <Typography.H7 className={cssClass.ms_2}>{content}</Typography.H7>
    </div>
  );
}
