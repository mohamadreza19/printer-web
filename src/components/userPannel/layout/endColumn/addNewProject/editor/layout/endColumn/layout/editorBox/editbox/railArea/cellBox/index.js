import { forwardRef, useEffect } from "react";
import {
  ColumnFive_delete,
  ColumnFive_duplicate,
} from "../../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import CellSplitController from "./CellSplitController";
// import { ColumnFive_delete } from "../../../";
import Full from "./Full";
import SplitedColumn from "./SplitedColumn";
import { useRecoilState, useRecoilValue } from "recoil";
import useCellReducer from "../../../../../../../../../../../../../recoil/reducer/useCellReducer";
import { Draggable } from "react-beautiful-dnd";

import { isView } from "../../../../../../../../../../../../../recoil/userEditorStore/selectionButtonsStore/actionButton";
import InnerContainer from "./layout/InnerContainer";
import { useRef } from "react";

export default function ({
  children,
  description = "Miniator circle braker F21",
  cell,
  index,
  railId = "",
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
  const isViewMode = useRecoilValue(isView);
  const [duplicateAction, setDuplicateAction] =
    useRecoilState(ColumnFive_duplicate);

  useEffect(() => {
    if (cell.isSelected) {
      if (duplicateAction) {
        if (!cell.parentId) {
          const payload = {
            cellId: cell.id,
          };
          setCell(payload, "DUPLICATECELL");
          setDuplicateAction(false);
        }
      }
      if (deleteAction) {
        if (!cell.parentId) {
          const payload = {
            cellId: cell.id,
          };
          setCell(payload, "DELETECELL");
          setdeleteAction(false);
        }
      }
    }
  }, [deleteAction, duplicateAction]);

  return (
    <Draggable
      draggableId={cell.id}
      index={index}
      key={cell.id}
      disableInteractiveElementBlocking={true}
    >
      {(provided, snapshot) => {
        return (
          <>
            {!isViewMode ? (
              <div
                style={{
                  width: `${cell.width}px`,
                  minWidth: `${cell.width}px`,
                }}
                className="position-relative h-100"
              >
                <Description />
                <CellSplitController railId={railId} cellForCheck={cell} />
              </div>
            ) : (
              <InnerContainer
                {...provided.draggableProps}
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                cellWidth={cell.width}
              >
                <Description />
                <CellSplitController cellForCheck={cell} />
              </InnerContainer>
            )}
          </>
        );
      }}
    </Draggable>
  );
}
