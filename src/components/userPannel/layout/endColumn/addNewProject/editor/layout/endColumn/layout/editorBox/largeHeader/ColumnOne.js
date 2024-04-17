import {
  JoinColumn,
  JoinRow,
  SpliteColumn,
  SpliteRow,
} from '../../../../../../../../../../../styles/__ready/EditorIcons';

import Typography from '../../../../../../../../../../../styles/__ready/Typography';
import { useDispatch, useSelector } from 'react-redux';
import useSelectedCell from '../../../../../../../../../../../redux/project/selectedCell';
import { addEditEvent } from '../../../../../../../../../../../redux/project/edit_event_slice';
import { getSelectedCell } from '../../../../../../../../../../../redux/project/selectedCell_slice';
import {
  getMutliSelectCells,
  joinCustomLabels,
} from '../../../../../../../../../../../redux/project/multi_selectCell_slice';

export default function ({
  mergeRowContent,
  rowSeparatorContent,
  mergeColumnContent,
  columnSeparatorContent,
}) {
  const dispatch = useDispatch();
  const Cell = useSelector(getSelectedCell);
  const multiSelectCells = useSelector(getMutliSelectCells);
  function onClick(type = '') {
    if (multiSelectCells.cellIds.length > 1) {
      if ('JOIN/COLUMN') {
        dispatch(joinCustomLabels(multiSelectCells));
        dispatch(
          addEditEvent({
            type: 'UN_SELECT',
            // itemId: Cell.frontId,
          })
        );
      }
    } else {
      const allow = preventToSendJoinEventFromUnchildrenCell(Cell, type);

      if (allow) {
        dispatch(
          addEditEvent({
            type: type,
            itemId: Cell.frontId,
          })
        );
      }
    }
  }
  const SplitRowBox = () => {
    return (
      <section
        onClick={() => onClick('SPLIT/ROW')}
        className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center"
      >
        <SpliteRow />
      </section>
    );
  };
  const JoinRowBox = () => {
    return (
      <section
        onClick={() => onClick('JOIN/ROW')}
        className="editor-small-cell-box  d-flex justify-content-center align-items-center"
      >
        <JoinRow />
      </section>
    );
  };
  const SplitColumnBox = () => {
    return (
      <section
        className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center"
        onClick={() => onClick('SPLIT/COLUMN')}
      >
        <SpliteColumn />
      </section>
    );
  };
  const JoinColumnBox = () => {
    return (
      <section
        onClick={() => onClick('JOIN/COLUMN')}
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
            width: '146px',
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
            width: '134px',
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
            width: '146px',
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
            width: '134px',
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
function preventToSendJoinEventFromUnchildrenCell(cell, type) {
  let allow = true;
  if (type === 'JOIN/COLUMN' || type === 'JOIN/ROW') {
    if (cell.frontId === cell.rootId) {
      allow = false;
    }
  }

  return allow;
}
