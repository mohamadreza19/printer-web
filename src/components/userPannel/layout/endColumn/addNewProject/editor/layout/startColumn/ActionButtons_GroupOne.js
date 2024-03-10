import { memo } from 'react';
import { useLanguage } from '../../../../../../../../recoil/readStore';
import { useShowSymbolPopUp_reducer } from '../../../../../../../../recoil/userEditorStore/showSymbol_store';
import Icons from '../../../../../../../../styles/__ready/Icons';
import SymbolPopUp from '../symbolPopUp/SymbolPopUp';
import { useDispatch, useSelector } from 'react-redux';
import { addEditEvent } from '../../../../../../../../redux/project/edit_event_slice';
import {
  getEditMode,
  selectMode,
  viewMode,
} from '../../../../../../../../redux/project/edit_mode_slice';

export default function ({
  actions = ' ',
  handeler = () => {},
  useSelection,
  useView,
  useUseText,
  useUseShape,
}) {
  const dispatch = useDispatch();
  const editMode = useSelector(getEditMode);
  const language = useLanguage();

  const { TOGGLE } = useShowSymbolPopUp_reducer();
  function onClickShape() {
    TOGGLE();
  }

  function changeEditMode(type) {
    switch (type) {
      case 'SELECT_MODE':
        return dispatch(selectMode());
      case 'VIEW_MODE':
        return dispatch(viewMode());
    }
  }

  const Select = () => {
    const changedColor =
      editMode === 'SELECT_MODE'
        ? {
            bg: 'editor-action-buttons-bg-primary',
            iconFill: 'fill_white',
          }
        : {
            bg: 'editor-action-buttons-bg-white',
            iconFill: 'fill_primary ',
          };
    return (
      <section
        onClick={() => changeEditMode('SELECT_MODE')}
        className={
          'editor-action-buttons  border-r-20 d-flex justify-content-center align-items-center mt-3 ' +
          changedColor.bg
        }
      >
        <Icons.Select_Cursor
          size="medium_v1"
          pathClassName={changedColor.iconFill}
        />
      </section>
    );
  };
  const View = () => {
    const changedColor =
      editMode === 'VIEW_MODE'
        ? {
            bg: 'editor-action-buttons-bg-primary',
            iconFill: 'fill_white',
          }
        : {
            bg: 'editor-action-buttons-bg-white',
            iconFill: 'fill_primary ',
          };
    return (
      <section
        onClick={() => changeEditMode('VIEW_MODE')}
        className={
          'editor-action-buttons  border-r-20 d-flex justify-content-center align-items-center mt-0_8rem ' +
          changedColor.bg
        }
      >
        <Icons.Hand size="medium_v1" pathClassName={changedColor.iconFill} />
      </section>
    );
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center ">
      <Select />
      <View />

      <Shape is={useUseShape} onClickShape={onClickShape} language={language} />
    </div>
  );
}
const Shape = ({ is, onClickShape, language }) => {
  let changedColor = {
    bg: ' ',
    iconFill: ' ',
  };
  changedColor = is
    ? (changedColor = {
        bg: 'editor-action-buttons-bg-primary',
        iconFill: 'fill_white',
      })
    : (changedColor = {
        bg: 'editor-action-buttons-bg-white',
        iconFill: 'fill_primary ',
      });
  return (
    <div className="position-relative">
      <SymbolPopUp />
      <section
        onClick={() => {
          // handeler(actions.SHAPE);
          onClickShape();
        }}
        className={
          'editor-action-buttons  border-r-20 d-flex justify-content-center align-items-center mt-0_8rem position-relative ' +
          changedColor.bg
        }
      >
        <Icons.Shape size="medium_v1" pathClassName={changedColor.iconFill} />
        <div
          className={`position-absolute  ${
            language == 'fa'
              ? 'footer-shape-icon-box-rtl'
              : 'footer-shape-icon-box-ltr'
          }`}
        >
          <Icons.Footer_Shape pathClassName={changedColor.iconFill} />
        </div>
      </section>
    </div>
  );
};
