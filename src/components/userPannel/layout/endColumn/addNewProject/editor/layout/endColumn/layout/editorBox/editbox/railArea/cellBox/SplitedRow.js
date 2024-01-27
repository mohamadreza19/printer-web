import { useRecoilState } from "recoil";
import { ColumnOne_joinRow } from "../../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import { Editor_Cell_Input } from "../../../../../../../../../../../../../styles/__ready/Textfields";
import CellSplitController from "./CellSplitController";
import { useEffect } from "react";
import { useSelection } from "../../../../../../../../../../../../../recoil/readStore/editor/ReadSelectionActionButton";

export default function ({ railId = "", child }) {
  return (
    <main
      // onClick={handleSelectCell_Via_onClick}
      className="w-100 h-100 d-flex flex-column  "
    >
      {child.children?.map((child, index) => {
        return (
          <div
            key={child + index}
            className={`w-100 h-50 d-flex justify-content-center align-items-center
        
          `}
          >
            <CellSplitController cellForCheck={child} railId={railId} />
          </div>
        );
      })}
    </main>
  );
}
