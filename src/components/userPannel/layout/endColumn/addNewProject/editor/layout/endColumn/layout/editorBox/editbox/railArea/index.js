import CellsBox from "./CellsBox";
import Title from "./Title";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  labelRail_column,
  railsWidth_store,
} from "../../../../../../../../../../../../recoil/userEditorStore/cellsStore";
import Icons from "../../../../../../../../../../../../styles/__ready/Icons";
import useScreenShot from "../../../../../../../../../../../../utility/useScreenShot";
import { useRef } from "react";

export default function ({
  index = 0,
  rail = {
    frontId: "",
    // customLabels: [],
    customLabels: [],
  },
  deleteRail = () => {},
}) {
  const TrashBox = () => {
    return (
      <div onClick={deleteRail} className="position-absolute trash-rail-box ">
        <Icons.Trash classNameForPath="fill_white" isForEditor />
      </div>
    );
  };

  return (
    <div
      className=" d-flex align-items-end rail  "
      style={
        {
          // height: railsWidth + "px",
        }
      }
    >
      <article className="d-flex align-items-center position-relative">
        {/* <TrashBox /> */}
        {/* <Title children={"ریل " + (Number(index) + 1)} /> */}
        <CellsBox
          isFirstRail={index === 0}
          //  customLabels={rail.customLabels} railId={rail.frontId}
          customLabels={rail.customLabels}
          railId={rail.frontId}
        />
      </article>
    </div>
  );
}
