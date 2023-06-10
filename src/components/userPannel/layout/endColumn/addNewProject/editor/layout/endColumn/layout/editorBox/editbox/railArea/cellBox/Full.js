import { useRecoilState } from "recoil";
import { Editor_Cell_Input } from "../../../../../../../../../../../../../styles/__ready/Textfields";
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
import { useEffect } from "react";
import { useSelection } from "../../../../../../../../../../../../../recoil/readStore/editor/ReadSelectionActionButton";

export default function ({
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
  ]);

  return (
    <main
      onClick={handleSelectCell_Via_onClick}
      className="w-100 h-100 d-flex justify-structure-center align-item-center bg-white  "
      style={{
        border: cell.isSelected
          ? "2px solid #F36523"
          : cell.children
          ? "1px solid blue"
          : "1px solid black",
        overflow: "hidden",
      }}
    >
      <Editor_Cell_Input
        value={cell.content.text}
        disabled={cell.isSelected}
        onChange={handleChangeValue}
        onBackspaceDown={handleDeleteContent}
        style={cell.content.style}
        isBarcode={cell.isBarcode}
        isQrcode={cell.isQrcode}
        // font={font.font}
      />
    </main>
  );
}
