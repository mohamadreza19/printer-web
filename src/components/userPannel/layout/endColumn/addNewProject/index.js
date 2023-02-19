import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import Header from "./Header";
import SwitchButton from "./SwitchButton";
import TextFildsFox from "./TextFildsFox";

export default function () {
  const language = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  return (
    <div className="w-100">
      <Header
        ms_2={cssClass.ms_2}
        addNewProject={language.userPannel.start_col.row2.addNewProject}
      />
      <TextFildsFox ms_2={cssClass.ms_2} me_1={cssClass.me_2} />
      <SwitchButton />
    </div>
  );
}
