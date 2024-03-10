import {
  JoinColumn,
  JoinRow,
  SpliteColumn,
  SpliteRow,
} from '../../../../../../../../../../../styles/__ready/EditorIcons';
import cellAction from '../../../../../../../../../../../recoil/actions/editor/cell/cell';
import useCellReducer from '../../../../../../../../../../../recoil/reducer/useCellReducer';
import { useRecoilState } from 'recoil';

import Typography from '../../../../../../../../../../../styles/__ready/Typography';
import { useDispatch, useSelector } from 'react-redux';
import useSelectedCell, {
  getSelectedCellSyle,
} from '../../../../../../../../../../../redux/project/selectedCell';
import { addEditEvent } from '../../../../../../../../../../../redux/project/edit_event_slice';
import { getSelectedCell } from '../../../../../../../../../../../redux/project/selectedCell_slice';
import {
  getMutliSelectCells,
  getMutliSelectCellsLength,
  joinCustomLabels,
} from '../../../../../../../../../../../redux/project/multi_selectCell_slice';
import { useTranslation } from 'react-i18next';

export default function ({
  poject_base,
  mergeRowContent,
  rowSeparatorContent,
  mergeColumnContent,
  columnSeparatorContent,
}) {
  const dispatch = useDispatch();
  const Cell = useSelector(getSelectedCell);
  const { t } = useTranslation();

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
      dispatch(
        addEditEvent({
          type: type,
          itemId: Cell.frontId,
        })
      );
      // dispatch(
      //   addEditEvent({
      //     type: "UN_SELECT",
      //     // itemId: Cell.frontId,
      //   })
      // );
    }
  }
  const SplitRowBox = () => {
    return (
      <>
        <section
          onClick={() => onClick('SPLIT/ROW')}
          className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center"
        >
          <SpliteRow />
          <div className="editor-small-info-cell-box">
            <Typography.H9>{t('editor.rowSeparator')}</Typography.H9>
          </div>
        </section>
      </>
    );
  };
  const JoinRowBox = () => {
    return (
      <section
        onClick={() => onClick('JOIN/ROW')}
        className="editor-small-cell-box  d-flex justify-content-center align-items-center"
      >
        <JoinRow />
        <div className="editor-small-info-cell-box">
          <Typography.H9>{t('editor.mergeRow')}</Typography.H9>
        </div>
      </section>
    );
  };

  const SplitColumnBox = () => {
    return (
      <section
        onClick={() => onClick('SPLIT/COLUMN')}
        className="d-flex editor-small-cell-box me-2  justify-content-center align-items-center"
      >
        <SpliteColumn />
        <div className="editor-small-info-cell-box">
          <Typography.H9> {t('editor.columnSeparator')}</Typography.H9>
        </div>
      </section>
    );
  };
  const JoinColumnBox = () => {
    return (
      <section
        onClick={() => onClick('JOIN/COLUMN')}
        className="d-flex editor-small-cell-box  justify-content-center align-items-center"
      >
        <JoinColumn />
        <div className="editor-small-info-cell-box">
          <Typography.H9>{t('editor.mergeColumn')}</Typography.H9>
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
