import { useRecoilState } from "recoil";
import { Editor_Cell_Input } from "../../../../../../../../../../../../../styles/__ready/Textfields";
import {
  ColumnOne_joinColumn,
  ColumnOne_joinRow,
  ColumnOne_splitColumn,
  ColumnOne_splitRow,
  ColumnTwo_font,
  ColumnTwo_textBold,
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
  const [textBold, setTextBold] = useRecoilState(ColumnTwo_textBold);
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
    if (textBold && cell.isSelected) {
      const payload = {
        cellId: cell.id,
        content: "bold",
      };
      setCell(payload, "TEXTBOLD");
      setTextBold(false);
    }
    // if bold italic underline aren't true
    if (textBold == false && cell.isSelected) {
      const payload = {
        cellId: cell.id,
        content: "regular",
      };
      // setCell(payload, "REGULAR");
      // setTextBold(false);
    }
  }, [splitColumn, splitRow, joinColumn, joinRow, font.isOnClick, textBold]);

  return (
    <main
      onClick={handleSelectCell_Via_onClick}
      className="w-100 h-100 d-flex justify-content-center align-item-center  "
    >
      <Editor_Cell_Input
        value={cell.content?.values}
        disabled={cell.isSelected}
        onChange={handleChangeValue}
        onBackspaceDown={handleDeleteContent}
        // font={font.font}
      />
    </main>
  );
}
