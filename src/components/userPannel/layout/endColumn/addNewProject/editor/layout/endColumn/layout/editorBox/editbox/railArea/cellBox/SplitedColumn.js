import { useRecoilState } from "recoil";
import { ColumnOne_joinColumn } from "../../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import { Editor_Cell_Input } from "../../../../../../../../../../../../../styles/__ready/Textfields";
import CellSplitController from "./CellSplitController";
import { useEffect } from "react";
import { useSelection } from "../../../../../../../../../../../../../recoil/readStore/editor/ReadSelectionActionButton";

export default function ({
  railId = "",
  child,
  parent = {
    frontId: " ",
    isSelected: false,
  },
  setCell = () => {},
}) {
  return (
    <main className="w-100 h-100 d-flex ">
      {child.children.map((child, index) => {
        return (
          <div
            key={index}
            // className={`w-50 h-100 d-flex justify-content-center align-items-center
            //  ${index > 0 ? " splitedColumn-border-left" : " "}
            // `}
            className={`w-50 h-100 d-flex justify-content-center align-items-center
            `}
          >
            <CellSplitController cellForCheck={child} railId={railId} />
          </div>
        );
      })}
    </main>
  );
}
