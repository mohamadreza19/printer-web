import { Navigate } from "react-router-dom";
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import useCachedLanguage from "../../../../../utility/useCachedLanguage";
import Header from "./Header";

import TextFildsFox from "./TextFildsFox";

import { useRecoilState } from "recoil";
import { showPutProjectResponse } from "../../../../../recoil/store/user/showPutProjectResponse";
import SuccessBox from "../../../../../common/SuccessBox";
import { getEditSussess } from "../../../../../redux/project/success_slice";
import { useSelector } from "react-redux";

export default function () {
  const content = useContent_Based_Language();
  const success = useSelector(getEditSussess);
  const language = useLanguage();
  const cssClass = useDynamicCssClass();
  const { value } = useCachedLanguage();
  const [showPutProjectResponse_, setShowPutProjectResponse] = useRecoilState(
    showPutProjectResponse
  );

  return (
    <div className="w-100">
      <Header
        ms_2={cssClass.ms_2}
        addNewProject={content.userPannel.start_col.row2.addNewProject}
      />
      <TextFildsFox
        ms_2={cssClass.ms_2}
        me_1={cssClass.me_2}
        content={{
          header: content.userPannel.end_col.addNewProject.header,
          inputLabelOne: content.userPannel.end_col.addNewProject.inputLabelOne,
          inputLabelTwo: content.userPannel.end_col.addNewProject.inputLabelTwo,
          inputLabelThree:
            content.userPannel.end_col.addNewProject.inputLabelThree,
          rightToLeft:
            content.userPannel.end_col.addNewProject.directionButton
              .rightToLeft,
          leftToRight:
            content.userPannel.end_col.addNewProject.directionButton
              .leftToRight,
          continueButton:
            content.userPannel.end_col.addNewProject.continueButton,
        }}
        isFa={value == "fa"}
      />
    </div>
  );
}
