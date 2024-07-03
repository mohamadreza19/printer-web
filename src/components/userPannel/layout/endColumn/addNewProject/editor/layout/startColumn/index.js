import { useState } from "react";
import useSelectionReducer from "../../../../../../../../recoil/reducer/editor/actionButtons/useSelectionReducer";
import SelectionAction from "../../../../../../../../recoil/actions/editor/actionButton/selectionbuttons";
import {
  useSelection,
  useView,
  useUseText,
  useUseShape,
} from "../../../../../../../../recoil/readStore/editor/ReadSelectionActionButton";
import ActionButtons_GroupOne from "./ActionButtons_GroupOne";
import ActionButtons_GroupTwo from "./ActionButtons_GroupTwo";
import IconBox from "./IconBox";

export default function () {
  const handleOnclickSelectionButton = useSelectionReducer();

  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-between py-1_8rem  ">
      <article>
        <IconBox />
        <ActionButtons_GroupOne useUseShape={useUseShape()} />
      </article>
      <ActionButtons_GroupTwo />
    </div>
  );
}
