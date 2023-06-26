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
  const [splitColumn, setSplitColumn] = useRecoilState(ColumnOne_splitColumn);
  const [splitRow, setSplitRow] = useRecoilState(ColumnOne_splitRow);
  const [joinRow, setJoinRow] = useRecoilState(ColumnOne_joinRow);
  const [joinColumn, setJoinColumn] = useRecoilState(ColumnOne_joinColumn);
  const SplitRowBox = () => {
    function onClick() {
      setSplitRow(true);
    }
    return (
      <section
        onClick={onClick}
        className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center"
      >
        <SpliteRow />
      </section>
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
      </section>
    );
  };

  return (
    <article className="">
      <header className="d-flex justify-content-between align-items-center mb-2">
        <section
          style={{
            width: "146px",
          }}
          className="d-flex justify-content-end align-items-center"
        >
          <Typography.H9_5 className="me-2">
            {rowSeparatorContent}
          </Typography.H9_5>
          <SplitRowBox />
        </section>
        <section
          style={{
            width: "134px",
          }}
          className="d-flex justify-content-end align-items-center"
        >
          <Typography.H9_5 className="me-2">{mergeRowContent}</Typography.H9_5>
          <JoinRowBox />
        </section>
      </header>
      <footer className="d-flex justify-content-between  align-items-center">
        <section
          style={{
            width: "146px",
          }}
          className="d-flex justify-content-end align-items-center"
        >
          <Typography.H9_5 className="me-2">
            {columnSeparatorContent}
          </Typography.H9_5>
          <SplitColumnBox />
        </section>
        <section
          style={{
            width: "134px",
          }}
          className="d-flex justify-content-end align-items-center"
        >
          <Typography.H9_5 className="me-2">
            {mergeColumnContent}
          </Typography.H9_5>
          <JoinColumnBox />
        </section>
      </footer>
    </article>
  );
}
