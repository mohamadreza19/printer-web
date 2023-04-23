import { useEffect } from "react";
import {
  ColumnFive_delete,
  ColumnFive_duplicate,
} from "../../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import CellSplitController from "./CellSplitController";
// import { ColumnFive_delete } from "../../../";
import Full from "./Full";
import SplitedColumn from "./SplitedColumn";
import { useRecoilState } from "recoil";
import useCellReducer from "../../../../../../../../../../../../../recoil/reducer/useCellReducer";
export default function ({
  children,
  description = "Miniator circle braker F21",
  cellWidth = 100,
  cell,

  HandleChangeInputValue,
  childrenHandleChangeInputValue,
}) {
  const setCell = useCellReducer();
  const Description = () => {
    return (
      <>
        <div className="edit-cell-caption-border"></div>
        <div className="edit-cell-caption-text-box">
          <p className="edit-cell-caption-text">{description}</p>
        </div>
      </>
    );
  };
  const [deleteAction, setdeleteAction] = useRecoilState(ColumnFive_delete);
  const [duplicateAction, setDuplicateAction] =
    useRecoilState(ColumnFive_duplicate);

  useEffect(() => {
    // if (cell.isSelected) {
    if (duplicateAction && cell.isSelected) {
      if (!cell.parentId) {
        const payload = {
          cellId: cell.id,
        };
        setCell(payload, "DUPLICATECELL");
        setDuplicateAction(false);
      }
    }
    if (deleteAction && cell.isSelected) {
      if (!cell.parentId) {
        const payload = {
          cellId: cell.id,
        };
        setCell(payload, "DELETECELL");
        setdeleteAction(false);
      }
    }
    // }
  }, [deleteAction, duplicateAction]);

  return (
    <section
      style={{
        width: `${100}px`,
        // background: cell.isSelected && "#f36523",
        // opacity: cell.isSelected && "0.6",
        // fontFamily: `'${cell.content.style.fontFamily}', sans-serif`,
        // fontWeight: cell.content.style.fontStyle == "bold" ? 600 : 400,
      }}
      className="h-100  position-relative"
    >
      <Description />
      <CellSplitController
        cellForCheck={cell}
        HandleChangeInputValue={HandleChangeInputValue}
        childrenHandleChangeInputValue={childrenHandleChangeInputValue}
      />
    </section>
  );
}
