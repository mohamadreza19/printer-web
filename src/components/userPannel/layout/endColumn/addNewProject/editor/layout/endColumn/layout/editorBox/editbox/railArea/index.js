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
import styled from "styled-components";

export default function ({
  index = 0,
  rail = {
    frontId: "",
    // customLabels: [],
    customLabels: [],
  },
  isLastRail = false,
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
      className=" d-flex align-items-end rail position-relative "
      style={
        {
          // height: railsWidth + "px",
        }
      }
    >
      <article className="d-flex align-items-center ">
        {/* <TrashBox /> */}
        {/* <Title children={"ریل " + (Number(index) + 1)} /> */}
        <CellsBox
          isFirstRail={index === 0}
          //  customLabels={rail.customLabels} railId={rail.frontId}
          customLabels={rail.customLabels}
          railId={rail.frontId}
        />
      </article>
      {isLastRail ? null : <Divider className="dashed-divider" />}
    </div>
  );
}
const Divider = styled.div`
  height: 1.5px;
  // background-color: red;
  // display: ${(prop) => (prop.isLastRail ? "none" : "block")};
  width: 80vw;
  position: absolute;
  top: 99%;
  border: 1.5px dashed black;
`;
