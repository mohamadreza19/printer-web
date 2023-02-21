import { Navigate } from "react-router-dom";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import useCachedLanguage from "../../../../../utility/useCachedLanguage";
import Header from "./Header";

import TextFildsFox from "./TextFildsFox";

export default function () {
  const language = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  const { value } = useCachedLanguage();

  return (
    <div className="w-100">
      <Header
        ms_2={cssClass.ms_2}
        addNewProject={language.userPannel.start_col.row2.addNewProject}
      />
      <TextFildsFox
        ms_2={cssClass.ms_2}
        me_1={cssClass.me_2}
        content={{
          header: language.userPannel.end_col.addNewProject.header,
          inputLabelOne:
            language.userPannel.end_col.addNewProject.inputLabelOne,
          inputLabelTwo:
            language.userPannel.end_col.addNewProject.inputLabelTwo,
          rightToLeft:
            language.userPannel.end_col.addNewProject.directionButton
              .rightToLeft,
          leftToRight:
            language.userPannel.end_col.addNewProject.directionButton
              .leftToRight,
          continueButton:
            language.userPannel.end_col.addNewProject.continueButton,
        }}
        isFa={value == "fa"}
      />
    </div>
  );
}
