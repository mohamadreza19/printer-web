import { useRecoilState } from "recoil";
import { ColumnOne_joinColumn } from "../../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import { Editor_Cell_Input } from "../../../../../../../../../../../../../styles/__ready/Textfields";
import CellSplitController from "./CellSplitController";
import { useEffect } from "react";
import { useSelection } from "../../../../../../../../../../../../../recoil/readStore/editor/ReadSelectionActionButton";

export default function ({ child }) {
  return (
    <main className="w-100 h-100 d-flex ">
      {child.children.map((child, index) => {
        const isLeftCell = index == 0;
        const isRightCell = index == 1;

        return (
          <div
            key={index}
            // className={`w-50 h-100 d-flex justify-content-center align-items-center
            //  ${index > 0 ? " splitedColumn-border-left" : " "}
            // `}
            className={`w-50 h-100 d-flex justify-content-center align-items-center
            `}
          >
            <CellSplitController
              cellForCheck={child}
              isLeftCell={isLeftCell}
              isRightCell={isRightCell}
            />
          </div>
        );
      })}
    </main>
  );
}
