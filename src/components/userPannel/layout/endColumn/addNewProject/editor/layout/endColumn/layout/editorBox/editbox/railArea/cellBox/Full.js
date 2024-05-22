import { useRecoilState, useRecoilValue } from "recoil";
import { Editor_Cell_Input } from "../../../../../../../../../../../../../styles/__ready/Textfields";
import allowReplaceInputToDiv_store from "../../../../../../../../../../../../../recoil/userEditorStore/allowReplaceInputToDiv_store";

import { useEffect, useRef, useState } from "react";
import { useSelection } from "../../../../../../../../../../../../../recoil/readStore/editor/ReadSelectionActionButton";

import styled from "styled-components";
import shortid from "shortid";

import { useDispatch, useSelector } from "react-redux";
import { addEditEvent } from "../../../../../../../../../../../../../redux/project/edit_event_slice";
import selectedCell from "../../../../../../../../../../../../../redux/project/selectedCell";
import {
  changeType,
  getBorderToPrint,
} from "../../../../../../../../../../../../../redux/project/border_slice";
import { addSelectedCell } from "../../../../../../../../../../../../../redux/project/selectedCell_slice";
import { getEditMode } from "../../../../../../../../../../../../../redux/project/edit_mode_slice";
export default function ({
  symbolDetail,
  index,
  cell = {
    frontId: " ",

    style: {
      fontSize: "14",
      angle: "14",
      textAlign: "center",
      fontStyle: "bold",
    },
    isBarcode: false,
    isQrcode: false,
    isSelected: false,
    symbolId: null,
  },
  isLast = false,

  // rootFrontId = "",
}) {
  const dispatch = useDispatch();
  const borderToPrint = useSelector(getBorderToPrint);
  const editMode = useSelector(getEditMode);

  const allowReplaceInputToDiv = useRecoilValue(allowReplaceInputToDiv_store);

  //

  //
  const ref = useRef(null);
  const [parentSize, setParentSize] = useState({
    width: Number,
    height: Number,
  });

  // const symbolDetail = Admin_User_Symbol("user");
  function handleSelectCell_Via_onClick() {
    const payload = {
      type: "SELECT",
      itemId: cell.frontId,
    };
    dispatch(addEditEvent(payload));
  }
  function handleDeleteSymbol() {
    if ("symbolId" in cell) {
      const payload = {
        cellId: cell.frontId,
      };
      // setCell(payload, "DELETESYMBOL");
    }
  }
  function handleChangeValue(value) {
    const payload = {
      type: "CONTENT/NEW",
      itemId: cell.frontId,
      value,
    };

    dispatch(addEditEvent(payload));
  }
  useEffect(() => {
    if (cell.isSelected) {
      dispatch(addSelectedCell(cell));
      // selectedCell('set', cell);
      // console.log({ cell });
    }
  }, [cell.isSelected]);
  useEffect(() => {
    if ("symbolId" in cell) {
      symbolDetail.mutate({ id: cell.symbolId });
    }
  }, [cell.symbolId]);

  useEffect(() => {
    setParentSize({
      width: getOrintaion("WIDTH"),
      height: getOrintaion("HEIGHT"),
    });
  }, []);
  function getOrintaion(type = "") {
    const WIDTH = "WIDTH";
    const HEIGHT = "HEIGHT";
    const parent = ref?.current;

    if (parent) {
      switch (type) {
        case WIDTH:
          const width = parent.getBoundingClientRect().width;

          return width;
        case HEIGHT:
          const height = parent.getBoundingClientRect().height;
          return height;
      }
    }
  }
  function CellStyle() {
    return cell.content.style;
  }

  return (
    <main
      ref={ref}
      id={`full-cell cell-${cell.frontId}`}
      onKeyDown={handleDeleteSymbol}
      tabIndex="-1"
      onClick={handleSelectCell_Via_onClick}
      className="w-100 h-100  bg-white position-relative d-flex justify-content-center align-content-center "
      style={{
        ...BorderToPrintController.setConfig(
          borderToPrint.type,
          borderToPrint.value,
          cell.isSelected
        ).getBorders(),

        minWidth: "100%",
        margin: "0",
        marginLeft: CellStyle().margin,
        marginRight: CellStyle().margin,
        overflow: "hidden",
        boxSizing: "border-box",
        // borderRight: "none",

        right: index * 0.2645833333 + "mm",
      }}
    >
      {/* <Editor_Cell_Input
        allowReplaceInputToDiv={allowReplaceInputToDiv}
        value={cell.content.text}
        disabled={cell.isSelected}
        onChange={handleChangeValue}
        style={cell.content.style}
        isBarcode={cell.isBarcode}
        isQrcode={cell.isQrcode}
        isSelection={editMode === "SELECT_MODE"}
       
      /> */}
      {"symbolId" in cell && symbolDetail.isSuccess ? (
        <ImageContainer
          svgSrc={symbolDetail.data}
          style={cell.content.style}
          cellSymbolId={cell.symbolId}
        />
      ) : (
        <>
          <Editor_Cell_Input
            allowReplaceInputToDiv={allowReplaceInputToDiv}
            value={cell.content.text}
            disabled={cell.isSelected}
            onChange={handleChangeValue}
            style={cell.content.style}
            isBarcode={cell.isBarcode}
            isQrcode={cell.isQrcode}
            isSelection={editMode === "SELECT_MODE"}
            // parentWidth={parentSize.width}
            // parentHeight={parentSize.height}
            // font={font.font}
          />
        </>
      )}
    </main>
  );
}

const ImageContainer = ({
  style = {
    angle: 0,
    fontFamily: "0",
    fontSize: 0,
    fontStyle: "regular",
    margin: 0,
    padding: 0,
    textAlign: "",
    textDirecton: "",
  },
  svgSrc,
  cellSymbolId,
}) => {
  const ref = useRef(null);
  const generatedID = shortid.generate();
  useEffect(() => {
    document.querySelector(`#cell-svg-container-${generatedID}`).innerHTML =
      svgSrc;

    const svgContainer = document.querySelector(
      `#cell-svg-container-${generatedID} svg`
    );
    if (svgContainer) {
      svgContainer.setAttribute("width", `${style.fontSize}px`);
      svgContainer.setAttribute("height", `${style.fontSize}px`);
    }
  }, [svgSrc, style.fontSize]);

  if (svgSrc)
    return (
      <Container
        ref={ref}
        id={`cell-svg-container-${generatedID}`}
        imageSize={style.fontSize}
        angle={style.angle}
        justify={style.textAlign}
      ></Container>
    );
};
// <img src={URL.createObjectURL(symbolDetail.data)} />
const Container = styled.div`
  width: 100%;
  height: 100%;
  rotate: ${({ angle }) => angle}deg;
  display: flex;
  justify-content: ${({ justify }) => textAlignToJustify(justify)};
  align-items: center;
`;
function textAlignToJustify(textAlign) {
  if (textAlign === "right") return "end";
  if (textAlign === "center") return "center";
  if (textAlign === "left") return "start";
  return "center";
}

class BorderToPrintController {
  static #borderType = ""; // use | none
  static #command = ""; // VERTICAL | ALL | HORIZONTAL | NONE
  static #CellIsSelected = false;

  static setConfig(borderType, command, CellIsSelected) {
    this.#borderType = borderType;
    this.#command = command;
    this.#CellIsSelected = CellIsSelected;
    return this;
  }

  static #handleBorder() {
    switch (this.#borderType) {
      case "use":
        if (this.#command === "ALL") {
          return {
            border: "1px solid black",
          };
        } else if (this.#command === "VERTICAL") {
          return {
            borderRight: "1px solid black",
            borderLeft: "1px solid black",
            borderTop: "none",
            borderBottom: "none",
          };
        } else if (this.#command === "HORIZONTAL") {
          return {
            borderRight: "none",
            borderLeft: "none",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
          };
        } else if (this.#command === "NONE") {
          return {
            borderRight: "none",
            borderLeft: "none",
            borderTop: "none",
            borderBottom: "none",
          };
        }

      case "none":
        return {
          borderColor: this.#CellIsSelected ? "#F36523" : "black",
          borderWidth: "1px",
          borderStyle: "solid",
        };
    }
  }
  static getBorders() {
    return this.#handleBorder();
  }
}
function handleBorderRightBasedIndex(isLast = false) {
  console.log({ isLast });
  if (!isLast) {
    return "1px solid black";
  } else {
    return "none";
  }
}
