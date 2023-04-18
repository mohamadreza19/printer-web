import { useRecoilState } from "recoil";
import { ColumnOne_joinColumn } from "../../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import { Editor_Cell_Input } from "../../../../../../../../../../../../../styles/__ready/Textfields";
import CellSplitController from "./CellSplitController";
import { useEffect } from "react";
import { useSelection } from "../../../../../../../../../../../../../recoil/readStore/editor/ReadSelectionActionButton";

export default function ({
  children,
  parent = {
    id: " ",
    isSelected: false,
  },
  setCell = () => {},
}) {
  return (
    <main className="w-100 h-100 d-flex ">
      {children.map((child, index) => {
        function HandleChangeInputValue(value) {
          const payload = {
            id: child.id,
            content: value,
          };
          setCell(payload, "SETCONTENT");
        }

        return (
          <div
            key={index}
            className={`w-50 h-100 d-flex justify-content-center align-items-center
            ${index > 0 ? " splitedColumn-border-left" : " "}
            `}
          >
            <CellSplitController cellForCheck={child} />
          </div>
        );
      })}
    </main>
  );
}
