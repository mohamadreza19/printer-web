import CellSplitController from "./CellSplitController";
// import { ColumnFive_delete } from "../../../";

import { useRecoilState, useRecoilValue } from "recoil";

import { Draggable } from "react-beautiful-dnd";

import { isView } from "../../../../../../../../../../../../../recoil/userEditorStore/selectionButtonsStore/actionButton";
import InnerContainer from "./layout/InnerContainer";

import { useProject_baseValue } from "../../../../../../../../../../../../../recoil/userEditorStore/project_base";
import { useSelector } from "react-redux";
import { getEditMode } from "../../../../../../../../../../../../../redux/project/edit_mode_slice";
import mmToPx from "../../../../../../../../../../../../../utility/editor-tools/mmToPx";
import isNumberInSequence from "../../../../../../../../../../../../../utility/editor-tools/isNumberInSequence";

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
  projectDimensions = {
    width: 0,
    height: 0,
  },
  isLast,
  isRootCell = false,
}) {
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

  const editMode = useSelector(getEditMode);
  const projectBase = useProject_baseValue();

  function get_Dimensions_based_label_project_template_exist() {
    let dimensions = {
      width: "",
      height: "",
    };

    if (projectBase === "CUSTOM") {
      dimensions.width = cell.height;
      dimensions.height = cell.width;

      return dimensions;
    } else if (projectBase === "PRODUCT") {
      // dimensions.width = projectDimensions.height;
      // dimensions.height = projectDimensions.width;

      if ("product" in cell && cell.product !== null) {
        dimensions.width = cell.product.width;
        dimensions.height = cell.width || projectDimensions.height;
      } else {
        dimensions.width = cell.height;
        dimensions.height = projectDimensions.height;
      }
    }

    return dimensions;
  }

  return (
    <Draggable
      isDragDisabled={editMode !== "VIEW_MODE"}
      draggableId={cell.structure.frontId}
      index={index}
      key={cell.structure.frontId}
      disableInteractiveElementBlocking={true}
    >
      {(provided, snapshot) => {
        console.log(isNumberInSequence(index + 1));
        const convertValueMmToPx = mmToPx(
          get_Dimensions_based_label_project_template_exist().width
        );

        return (
          <>
            {editMode !== "VIEW_MODE" ? (
              <div
                key={index}
                data-root-id={cell.structure.frontId}
                data-rail-id={railId}
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
                  cellForCheck={cell.structure}
                  index={index}
                  isRootCell={isRootCell}
                  isLast={isLast}
                />
              </div>
            ) : (
              <InnerContainer
                key={index}
                data-root-id={cell.structure.frontId}
                data-rail-id={railId}
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
                  index={index}
                  cellForCheck={cell.structure}
                  isRootCell={isRootCell}
                  isLast={isLast}
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
