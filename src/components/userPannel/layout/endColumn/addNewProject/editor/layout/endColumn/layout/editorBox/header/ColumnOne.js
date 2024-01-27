import {
  JoinColumn,
  JoinRow,
  SpliteColumn,
  SpliteRow,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import cellAction from "../../../../../../../../../../../recoil/actions/editor/cell/cell";
import useCellReducer from "../../../../../../../../../../../recoil/reducer/useCellReducer";
import { useRecoilState } from "recoil";

import Typography from "../../../../../../../../../../../styles/__ready/Typography";
import { useDispatch } from "react-redux";
import useSelectedCell, {
  getSelectedCellSyle,
} from "../../../../../../../../../../../redux/project/selectedCell";
import { addEditEvent } from "../../../../../../../../../../../redux/project/edit_event_slice";

export default function ({
  poject_base,
  mergeRowContent,
  rowSeparatorContent,
  mergeColumnContent,
  columnSeparatorContent,
}) {
  const dispatch = useDispatch();
  const Cell = useSelectedCell("get");

  function onClick(type = "") {
    dispatch(
      addEditEvent({
        type: type,
        itemId: Cell.frontId,
      })
    );
  }
  const SplitRowBox = () => {
    return (
      <>
        <section
          onClick={() => onClick("SPLIT/ROW")}
          className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center"
        >
          <SpliteRow />
          <div className="editor-small-info-cell-box">
            <Typography.H9>{rowSeparatorContent}</Typography.H9>
          </div>
        </section>
      </>
    );
  };
  const JoinRowBox = () => {
    return (
      <section
        onClick={() => onClick("JOIN/ROW")}
        className="editor-small-cell-box  d-flex justify-content-center align-items-center"
      >
        <JoinRow />
        <div className="editor-small-info-cell-box">
          <Typography.H9>{mergeRowContent}</Typography.H9>
        </div>
      </section>
    );
  };

  const SplitColumnBox = () => {
    return (
      <section
        onClick={() => onClick("SPLIT/COLUMN")}
        style={{
          display: poject_base === "PRODUCT" ? "none" : "flex",
        }}
        className="editor-small-cell-box me-2  justify-content-center align-items-center"
      >
        <SpliteColumn />
        <div className="editor-small-info-cell-box">
          <Typography.H9> {columnSeparatorContent}</Typography.H9>
        </div>
      </section>
    );
  };
  const JoinColumnBox = () => {
    return (
      <section
        onClick={() => onClick("JOIN/COLUMN")}
        style={{
          display: poject_base === "PRODUCT" ? "none" : "flex",
        }}
        className="editor-small-cell-box  justify-content-center align-items-center"
      >
        <JoinColumn />
        <div className="editor-small-info-cell-box">
          <Typography.H9>{mergeColumnContent}</Typography.H9>
        </div>
      </section>
    );
  };

  return (
    <article className="">
      <header className="d-flex mb-2">
        <SplitRowBox />
        <JoinRowBox />
      </header>
      <footer className="d-flex">
        <SplitColumnBox />
        <JoinColumnBox />
      </footer>
    </article>
  );
}
