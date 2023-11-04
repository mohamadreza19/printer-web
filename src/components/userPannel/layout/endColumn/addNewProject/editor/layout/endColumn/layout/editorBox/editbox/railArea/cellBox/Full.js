import { useRecoilState, useRecoilValue } from "recoil";
import { Editor_Cell_Input } from "../../../../../../../../../../../../../styles/__ready/Textfields";
import allowReplaceInputToDiv_store from "../../../../../../../../../../../../../recoil/userEditorStore/allowReplaceInputToDiv_store";
import {
  ColumnFive_barcode,
  ColumnFive_delete,
  ColumnFive_duplicate,
  ColumnFive_qr,
  ColumnOne_joinColumn,
  ColumnOne_joinRow,
  ColumnOne_splitColumn,
  ColumnOne_splitRow,
  ColumnThree_FontStyle,
  ColumnThree_angle,
  ColumnThree_fontSize,
  ColumnThree_margin,
  ColumnThree_padding,
  ColumnTwo_TextAlign,
  ColumnTwo_font,
} from "../../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import { useEffect, useRef, useState } from "react";
import { useSelection } from "../../../../../../../../../../../../../recoil/readStore/editor/ReadSelectionActionButton";
import { symbolUsed_store } from "../../../../../../../../../../../../../recoil/userEditorStore/showSymbol_store";
import { Admin_User_Symbol } from "../../../../../../../../../../../../../reactQuery/common/callGetService";
import styled from "styled-components";
import shortid from "shortid";

export default function ({
  symbolDetail,
  railId = "",
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
  // rootFrontId = "",
  setCell = () => {},
}) {
  const isSelection = useSelection();

  const [splitColumn, setSplitColumn] = useRecoilState(ColumnOne_splitColumn);
  const [splitRow, setSplitRow] = useRecoilState(ColumnOne_splitRow);
  const [joinColumn, setJoinColumn] = useRecoilState(ColumnOne_joinColumn);
  const [joinRow, setJoinRow] = useRecoilState(ColumnOne_joinRow);
  const [font, setFont] = useRecoilState(ColumnTwo_font);
  const [fontStyle, setFontStyle] = useRecoilState(ColumnThree_FontStyle);
  const [textAlign, setTextAlign] = useRecoilState(ColumnTwo_TextAlign);
  const [fontAngle, setFontAngle] = useRecoilState(ColumnThree_angle);
  const [cellMargin, setCellMargin] = useRecoilState(ColumnThree_margin);
  const [cellPadding, setCellPadding] = useRecoilState(ColumnThree_padding);
  const [fontSizeAction, setFontSizeAction] =
    useRecoilState(ColumnThree_fontSize);
  const [bacodeWant, setIsBacodeWant] = useRecoilState(ColumnFive_barcode);
  const [qrWant, setQrWant] = useRecoilState(ColumnFive_qr);
  const [symbolUsed, setSymbolUsed] = useRecoilState(symbolUsed_store);
  const allowReplaceInputToDiv = useRecoilValue(allowReplaceInputToDiv_store);
  //
  const ref = useRef(null);
  const [parentSize, setParentSize] = useState({
    width: Number,
    height: Number,
  });

  // const symbolDetail = Admin_User_Symbol("user");

  function handleSelectCell_Via_onClick() {
    if (!cell.parentId && !cell.isSelected) {
      const payload = {
        railId: railId,
        cellId: cell.frontId,
        // cellId: rootFrontId,
      };

      setCell(payload, "SELECT");
    }
    if (!isSelection && !cell.isSelected) return;

    const payload = {
      railId: railId,
      cellId: cell.frontId,
    };

    setCell(payload, "SELECT");
  }
  function handleDeleteSymbol() {
    if ("symbolId" in cell) {
      const payload = {
        railId: railId,
        cellId: cell.frontId,
      };
      setCell(payload, "DELETESYMBOL");
    }
  }
  function handleChangeValue(value) {
    const payload = {
      railId: railId,
      cellId: cell.frontId,
      content: value,
    };
    setCell(payload, "NEWSETCONTENT");
  }
  function handleDeleteContent() {
    const payload = {
      railId: railId,
      cellId: cell.frontId,
    };
    setCell(payload, "DELETECONTENT");
  }
  useEffect(() => {
    if ("symbolId" in cell) {
      symbolDetail.mutate({ id: cell.symbolId });
    }
  }, [cell.symbolId]);
  // console.log({ data: symbolDetail.data });
  useEffect(() => {
    if (cell.isSelected) {
      if (splitColumn) {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
        };

        setCell(payload, "SPLITCOLUMN");
        setSplitColumn(false);
      }
      if (splitRow) {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
        };
        setCell(payload, "SPLITROW");
        setSplitRow(false);
      }
      if (joinColumn) {
        if (cell.parentId) {
          const payload = {
            railId: railId,
            cellId: undefined,
            parentId: cell.parentId,
          };
          setCell(payload, "JOINCOLUMN");
          setJoinColumn(false);
        } else {
          const payload = {
            railId: railId,
            cellId: cell.frontId,
            parentId: undefined,
          };
          setCell(payload, "JOINCOLUMN");
          setJoinColumn(false);
        }
      }
      if (joinRow) {
        if (cell.parentId) {
          const payload = {
            railId: railId,
            cellId: undefined,
            parentId: cell.parentId,
          };
          setCell(payload, "JOINROW");
          setJoinRow(false);
        } else {
          const payload = {
            railId: railId,
            cellId: cell.frontId,
            parentId: undefined,
          };
          setCell(payload, "JOINROW");
          setJoinRow(false);
        }
      }
      if (font.isOnClick) {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
          structure: font.font,
        };
        setCell(payload, "SETFONT");
        setFont((draft) => ({ ...draft, isOnClick: false, font: "Arial" }));
      }
      if (fontStyle.isUsed && fontStyle.chosenStyle == "bold") {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
          structure: "bold",
        };
        setCell(payload, "FONTSTYLE");
        setFontStyle((draft) => ({ ...draft, isUsed: false }));
      }
      if (fontStyle.isUsed && fontStyle.chosenStyle == "italic") {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
          structure: "italic",
        };
        setCell(payload, "FONTSTYLE");
        setFontStyle((draft) => ({ ...draft, isUsed: false }));
      }
      if (fontStyle.isUsed && fontStyle.chosenStyle == "underline") {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
          structure: "underline",
        };
        setCell(payload, "FONTSTYLE");
        setFontStyle((draft) => ({ ...draft, isUsed: false }));
      }
      if (fontStyle.isUsed && fontStyle.chosenStyle == "regular") {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
          structure: "regular",
        };
        setCell(payload, "FONTSTYLE");
        setFontStyle((draft) => ({ ...draft, isUsed: false }));
      }
      if (textAlign.isUsed) {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
          structure: textAlign.chosenAlign,
        };
        setCell(payload, "TEXTALIGN");
        setTextAlign((draft) => ({
          ...draft,
          textAlign: "none",
          isUsed: false,
        }));
      }
      if (fontSizeAction.isUsed) {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
          structure: fontSizeAction.chosenAction,
        };
        setCell(payload, "CHANGEFONTSIZE");
        setFontSizeAction((draft) => ({
          ...draft,
          chosenAction: "none",
          isUsed: false,
        }));
      }
      if (fontAngle.isUsed) {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
          structure: fontAngle.chosenAction,
        };
        setCell(payload, "CHANGEFONTANGLE");
        setFontAngle((draft) => ({
          ...draft,
          chosenAction: "none",
          isUsed: false,
        }));
      }
      if (cellMargin.isUsed) {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
          structure: cellMargin.chosenAction,
        };
        setCell(payload, "CHANGECELLMARGIN");
        setCellMargin((draft) => ({
          ...draft,
          chosenAction: "none",
          isUsed: false,
        }));
      }
      if (cellPadding.isUsed == true) {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
          structure: cellPadding.chosenAction,
        };

        setCell(payload, "CHANGECELLPADDING");
        setCellPadding((draft) => ({
          ...draft,
          chosenAction: "none",
          isUsed: false,
        }));
      }
      if (bacodeWant) {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
        };
        setCell(payload, "ISBACODE");
        setIsBacodeWant(false);
      }
      if (qrWant) {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
        };
        setCell(payload, "QRCODE");
        setQrWant(false);
      }
      if (symbolUsed.isUsed) {
        const payload = {
          railId: railId,
          cellId: cell.frontId,
          symbolId: symbolUsed.payload,
        };
        setCell(payload, "SETSYMBOL");
        setSymbolUsed({
          isUsed: false,
          payload: "",
        });
      }
    }
  }, [
    splitColumn,
    splitRow,
    joinColumn,
    joinRow,
    font.isOnClick,
    fontStyle.isUsed,
    textAlign.isUsed,
    fontSizeAction.isUsed,
    fontAngle.isUsed,
    cellMargin.isUsed,
    cellPadding.isUsed,
    bacodeWant,
    qrWant,
    symbolUsed.isUsed,
  ]);
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

  return (
    <main
      ref={ref}
      id={`full-cell cell-${cell.frontId}`}
      onKeyDown={handleDeleteSymbol}
      tabIndex="-1"
      onClick={handleSelectCell_Via_onClick}
      className="w-100 h-100  bg-white position-relative d-flex justify-content-center align-content-center "
      style={{
        border: cell.isSelected
          ? "1px solid #F36523"
          : cell.children
          ? "1px solid blue"
          : "1px solid black",
        overflow: "hidden",
      }}
    >
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
            isSelection={isSelection}
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

    const svg = document.querySelector(
      `#cell-svg-container-${generatedID} svg`
    );
    const path = document.querySelector(
      `#cell-svg-container-${generatedID} svg path`
    );
    if (svg && path) {
      svg.attributes.width.value = style.fontSize;
      svg.attributes.height.value = style.fontSize;
      svg.attributes.fill.value = "black";
      path.attributes.fill.value = "black";
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
