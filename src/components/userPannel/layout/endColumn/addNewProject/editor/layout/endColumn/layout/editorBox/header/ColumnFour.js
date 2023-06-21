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
import Typography from "../../../../../../../../../../../styles/__ready/Typography";

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

    return (
      <footer className="d-flex">
        <article className="position-relative">
          <section onClick={() => onClick("right")} className="cell-regular">
            <div
              className={`editor-small-cell-box me-2 d-flex justify-content-center align-items-center ${
                justify == "right" && "opacity-4"
              }`}
            >
              <RightToLeft />
            </div>
            <div className="editor-small-info-cell-box">
              <Typography.H9>چینش راست به چپ</Typography.H9>
            </div>
          </section>
        </article>
        <article className="position-relative">
          <section onClick={() => onClick("left")} className="cell-regular">
            <div
              className={`editor-small-cell-box d-flex justify-content-center align-items-center ${
                justify == "left" && "opacity-4"
              }`}
            >
              <LeftToRight />
            </div>
            <div className="editor-small-info-cell-box">
              <Typography.H9>چینش چپ به راست</Typography.H9>
            </div>
          </section>
        </article>
      </footer>
    );
  };
  const RedoBox = () => {
    function onClick() {
      setCell(undefined, "REDO");
    }

    return (
      <article className="position-relative">
        <section onClick={onClick} className="cell-regular">
          <div
            className={`editor-small-cell-box me-2 d-flex justify-content-center align-items-center ${
              useRedo ? "" : "opacity-4"
            }`}
          >
            <Redo />
          </div>
          <div className="editor-small-info-cell-box">
            <Typography.H9>رفتن به جلو</Typography.H9>
          </div>
        </section>
      </article>
    );
  };
  const UndoBox = () => {
    function onClick() {
      setCell(undefined, "UNDO");
    }
    return (
      <article className="position-relative">
        <section onClick={onClick} className="cell-regular">
          <div
            className={`editor-small-cell-box d-flex justify-content-center align-items-center ${
              useUndo ? "" : "opacity-4"
            }`}
          >
            <Undo />
          </div>
          <div className="editor-small-info-cell-box">
            <Typography.H9>بازگشت به قبل</Typography.H9>
          </div>
        </section>
      </article>
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
