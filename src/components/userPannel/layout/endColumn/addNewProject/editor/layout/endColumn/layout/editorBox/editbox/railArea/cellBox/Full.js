import { useRecoilState } from "recoil";
import { Editor_Cell_Input } from "../../../../../../../../../../../../../styles/__ready/Textfields";
import {
  ColumnFive_delete,
  ColumnFive_duplicate,
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
  cell = {
    id: " ",
    content: {
      values: "",
      style: {
        fontSize: "14",
        angle: "14",
        textAlign: "center",
        fontStyle: "bold",
      },
    },
    isSelected: false,
  },
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
  const [deleteAction, setdeleteAction] = useRecoilState(ColumnFive_delete);
  const [duplicateAction, setDuplicateAction] =
    useRecoilState(ColumnFive_duplicate);
  function handleSelectCell_Via_onClick() {
    if (!cell.parentId && !cell.isSelected) {
      const payload = {
        cellId: cell.id,
      };

      setCell(payload, "SELECT/PARENT");
    }
    if (!isSelection && !cell.isSelected) return;
    const payload = {
      cellId: cell.id,
    };

    setCell(payload, "SELECT");
  }

  function handleChangeValue(value) {
    const payload = {
      cellId: cell.id,
      content: {
        value,
      },
    };
    setCell(payload, "NEWSETCONTENT");
  }
  function handleDeleteContent() {
    const payload = {
      cellId: cell.id,
    };
    setCell(payload, "DELETECONTENT");
  }

  useEffect(() => {
    if (splitColumn && cell.isSelected) {
      const payload = {
        cellId: cell.id,
      };

      setCell(payload, "SPLITCOLUMN");
      setSplitColumn(false);
    }
    if (splitRow && cell.isSelected) {
      const payload = {
        cellId: cell.id,
      };
      setCell(payload, "SPLITROW");
      setSplitRow(false);
    }
    if (joinColumn && cell.isSelected) {
      if (cell.parentId) {
        const payload = {
          cellId: undefined,
          parentId: cell.parentId,
        };
        setCell(payload, "JOINCOLUMN");
        setJoinColumn(false);
      } else {
        const payload = {
          cellId: cell.id,
          parentId: undefined,
        };
        setCell(payload, "JOINCOLUMN");
        setJoinColumn(false);
      }
    }
    if (joinRow && cell.isSelected) {
      if (cell.parentId) {
        const payload = {
          cellId: undefined,
          parentId: cell.parentId,
        };
        setCell(payload, "JOINROW");
        setJoinRow(false);
      } else {
        const payload = {
          cellId: cell.id,
          parentId: undefined,
        };
        setCell(payload, "JOINROW");
        setJoinRow(false);
      }
    }
    if (font.isOnClick && cell.isSelected) {
      const payload = {
        cellId: cell.id,
        content: font.font,
      };
      setCell(payload, "SETFONT");
      setFont((draft) => ({ ...draft, isOnClick: false, font: "Arial" }));
    }
    if (
      fontStyle.isUsed &&
      fontStyle.chosenStyle == "bold" &&
      cell.isSelected
    ) {
      const payload = {
        cellId: cell.id,
        content: "bold",
      };
      setCell(payload, "FONTSTYLE");
      setFontStyle((draft) => ({ ...draft, isUsed: false }));
    }
    if (
      fontStyle.isUsed &&
      fontStyle.chosenStyle == "italic" &&
      cell.isSelected
    ) {
      const payload = {
        cellId: cell.id,
        content: "italic",
      };
      setCell(payload, "FONTSTYLE");
      setFontStyle((draft) => ({ ...draft, isUsed: false }));
    }
    if (
      fontStyle.isUsed &&
      fontStyle.chosenStyle == "underline" &&
      cell.isSelected
    ) {
      const payload = {
        cellId: cell.id,
        content: "underline",
      };
      setCell(payload, "FONTSTYLE");
      setFontStyle((draft) => ({ ...draft, isUsed: false }));
    }
    if (
      fontStyle.isUsed &&
      fontStyle.chosenStyle == "regular" &&
      cell.isSelected
    ) {
      const payload = {
        cellId: cell.id,
        content: "regular",
      };
      setCell(payload, "FONTSTYLE");
      setFontStyle((draft) => ({ ...draft, isUsed: false }));
    }
    if (textAlign.isUsed == true && cell.isSelected) {
      const payload = {
        cellId: cell.id,
        content: textAlign.chosenAlign,
      };
      setCell(payload, "TEXTALIGN");
      setTextAlign((draft) => ({
        ...draft,
        textAlign: "none",
        isUsed: false,
      }));
    }
    if (fontSizeAction.isUsed == true && cell.isSelected) {
      const payload = {
        cellId: cell.id,
        content: fontSizeAction.chosenAction,
      };
      setCell(payload, "CHANGEFONTSIZE");
      setFontSizeAction((draft) => ({
        ...draft,
        chosenAction: "none",
        isUsed: false,
      }));
    }
    if (fontAngle.isUsed == true && cell.isSelected) {
      const payload = {
        cellId: cell.id,
        content: fontAngle.chosenAction,
      };
      setCell(payload, "CHANGEFONTANGLE");
      setFontAngle((draft) => ({
        ...draft,
        chosenAction: "none",
        isUsed: false,
      }));
    }
    if (cellMargin.isUsed == true && cell.isSelected) {
      const payload = {
        cellId: cell.id,
        content: cellMargin.chosenAction,
      };
      setCell(payload, "CHANGECELLMARGIN");
      setCellMargin((draft) => ({
        ...draft,
        chosenAction: "none",
        isUsed: false,
      }));
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
    deleteAction,
    duplicateAction,
  ]);
  // console.table({ textAlign });

  return (
    <main
      onClick={handleSelectCell_Via_onClick}
      className="w-100 h-100 d-flex justify-content-center align-item-center bg-white  "
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
        value={cell.content?.values}
        disabled={cell.isSelected}
        onChange={handleChangeValue}
        onBackspaceDown={handleDeleteContent}
        style={cell.content?.style}
        // font={font.font}
      />
    </main>
  );
}
