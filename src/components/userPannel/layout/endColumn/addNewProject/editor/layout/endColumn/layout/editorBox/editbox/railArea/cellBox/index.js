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
import { useGetLabel } from "../../../../../../../../../../../../../recoil/store/label";

export default function ({
  children,
  cell = {
    structure: {
      frontId: "",
      isSelected: false,
    },
    product: {
      description: {
        english: "",
        persian: "",
        turkish: "",
      },
      name: {
        english: "",
        persian: "",
        turkish: "",
      },
      width: "",
      widthOfPrintingArea: 0,
    },
  },
  index,
  railId = "",
}) {
  const setCell = useCellReducer();
  const label_project_template = useGetLabel();

  const Description = () => {
    function substringText(text) {
      if (text)
        if (text.length > 21) {
          let textNew = text.substring(0, 20);
          textNew = textNew.concat("...");
          return textNew;
        } else {
          let textNew = text.substring(0, 20);
          return textNew;
        }
    }
    return (
      <>
        <div
          style={{
            width: `${cell.product.width}`,
          }}
          className=" edit-cell-caption-border"
        ></div>
        <div className="edit-cell-caption-text-box">
          <p className="edit-cell-caption-text">
            {/* {cell.product.description.english} */}
            {substringText(cell.product.name.english)}
          </p>
        </div>
      </>
    );
  };
  const [deleteAction, setdeleteAction] = useRecoilState(ColumnFive_delete);
  const isViewMode = useRecoilValue(isView);
  const [duplicateAction, setDuplicateAction] =
    useRecoilState(ColumnFive_duplicate);

  useEffect(() => {
    if (cell.structure.isSelected) {
      if (duplicateAction) {
        if (!cell.parentId) {
          const payload = {
            cellId: cell.frontId,
            railId,
          };
          setCell(payload, "DUPLICATECELL");
          setDuplicateAction(false);
        }
      }
      if (deleteAction) {
        if (!cell.parentId) {
          const payload = {
            cellId: cell.frontId,
            railId,
          };
          setCell(payload, "DELETECELL");
          setdeleteAction(false);
        }
      }
    }
  }, [deleteAction, duplicateAction]);
  function get_Dimensions_based_label_project_template_exist() {
    let dimensions = {
      width: "",
      height: "",
    };

    if (label_project_template.width && label_project_template.height) {
      dimensions.width = label_project_template.height;
      dimensions.height = label_project_template.width;
    } else {
      dimensions.width = cell.product.width;
      dimensions.height = cell.product.widthOfPrintingArea;
    }
    return dimensions;
  }

  return (
    <Draggable
      draggableId={cell.structure.frontId}
      index={index}
      key={cell.structure.frontId}
      disableInteractiveElementBlocking={true}
    >
      {(provided, snapshot) => {
        return (
          <>
            {!isViewMode ? (
              <div
                style={{
                  width: `${
                    get_Dimensions_based_label_project_template_exist().width
                  }mm`,
                  minWidth: `${
                    get_Dimensions_based_label_project_template_exist().width
                  }mm`,
                  height: `${
                    get_Dimensions_based_label_project_template_exist().height
                  }mm`,
                }}
                className="position-relative "
              >
                {/* <Description /> */}
                <CellSplitController
                  railId={railId}
                  cellForCheck={{ ...cell.structure, frontId: cell.frontId }}
                  // rootFrontId={cell.frontId}
                />
              </div>
            ) : (
              <InnerContainer
                {...provided.draggableProps}
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                cellWidth={
                  get_Dimensions_based_label_project_template_exist().width
                }
                cellWidthOfPrintingArea={
                  get_Dimensions_based_label_project_template_exist().height
                }
              >
                {/* <Description /> */}
                <CellSplitController
                  railId={railId}
                  cellForCheck={{ ...cell.structure, frontId: cell.frontId }}
                  // rootFrontId={cell.frontId}
                />
              </InnerContainer>
            )}
          </>
        );
      }}
    </Draggable>
  );
}
