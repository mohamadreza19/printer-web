import { useRecoilState, useRecoilValue } from "recoil";
import {
  ColumnFour_justify_start,
  ColumnFour_redo,
  ColumnFour_undo,
} from "../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import {
  LeftToRight,
  Redo,
  RightToLeft,
  Undo,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import useCellReducer from "../../../../../../../../../../../recoil/reducer/useCellReducer";

export default function () {
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);
  const useRedo = useRecoilValue(ColumnFour_redo);
  const useUndo = useRecoilValue(ColumnFour_undo);
  const setCell = useCellReducer();
  const JustifyRealBox = () => {
    function onClick(justifyToSet) {
      if (justifyToSet == "right") {
        setJustify("right");
      }
      if (justifyToSet == "left") {
        setJustify("left");
      }
    }
    console.log({ justify });
    return (
      <footer className="d-flex">
        <section
          onClick={() => onClick("right")}
          className={`editor-small-cell-box me-2 d-flex justify-content-center align-items-center ${
            justify == "right" && "opacity-4"
          }`}
        >
          <RightToLeft />
        </section>
        <section
          onClick={() => onClick("left")}
          className={`editor-small-cell-box d-flex justify-content-center align-items-center ${
            justify == "left" && "opacity-4"
          }`}
        >
          <LeftToRight />
        </section>
      </footer>
    );
  };
  const RedoBox = () => {
    function onClick() {
      setCell(undefined, "REDO");
    }

    return (
      <section
        onClick={onClick}
        className={`editor-small-cell-box me-2 d-flex justify-content-center align-items-center ${
          useRedo ? "" : "opacity-4"
        }`}
      >
        <Redo />
      </section>
    );
  };
  const UndoBox = () => {
    function onClick() {
      setCell(undefined, "UNDO");
    }
    return (
      <section
        onClick={onClick}
        className={`editor-small-cell-box d-flex justify-content-center align-items-center ${
          useUndo ? "" : "opacity-4"
        }`}
      >
        <Undo />
      </section>
    );
  };
  return (
    <article className="">
      <header className="d-flex mb-2">
        <RedoBox />
        <UndoBox />
      </header>
      <JustifyRealBox />
    </article>
  );
}
