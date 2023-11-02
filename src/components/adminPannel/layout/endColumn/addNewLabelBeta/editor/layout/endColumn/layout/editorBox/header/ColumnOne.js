import {
  JoinColumn,
  JoinRow,
  SpliteColumn,
  SpliteRow,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import cellAction from "../../../../../../../../../../../recoil/actions/editor/cell/cell";
import useCellReducer from "../../../../../../../../../../../recoil/reducer/useCellReducer";
import { useRecoilState } from "recoil";
import {
  ColumnOne_joinColumn,
  ColumnOne_joinRow,
  ColumnOne_splitColumn,
  ColumnOne_splitRow,
} from "../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import Typography from "../../../../../../../../../../../styles/__ready/Typography";

export default function ({
  mergeRowContent,
  rowSeparatorContent,
  mergeColumnContent,
  columnSeparatorContent,
}) {
  const setCell = useCellReducer();
  const [splitColumn, setSplitColumn] = useRecoilState(ColumnOne_splitColumn);
  const [splitRow, setSplitRow] = useRecoilState(ColumnOne_splitRow);
  const [joinRow, setJoinRow] = useRecoilState(ColumnOne_joinRow);
  const [joinColumn, setJoinColumn] = useRecoilState(ColumnOne_joinColumn);
  const SplitRowBox = () => {
    function onClick() {
      setSplitRow(true);
    }
    return (
      <>
        <section
          onClick={onClick}
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
    function onClick() {
      setJoinRow(true);
    }
    return (
      <section
        onClick={onClick}
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
    function onClick() {
      setSplitColumn(true);
    }
    return (
      <section
        className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center"
        onClick={onClick}
      >
        <SpliteColumn />
        <div className="editor-small-info-cell-box">
          <Typography.H9> {columnSeparatorContent}</Typography.H9>
        </div>
      </section>
    );
  };
  const JoinColumnBox = () => {
    function onClick() {
      setJoinColumn(true);
    }
    return (
      <section
        onClick={onClick}
        className="editor-small-cell-box  d-flex justify-content-center align-items-center"
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
