import { useRecoilState, useRecoilValue } from 'recoil';
import {
  DropDown,
  TextBold,
  TextCenter,
  TextItalic,
  TextLeft,
  TextRight,
  TextUnderLine,
} from '../../../../../../../../../../../styles/__ready/EditorIcons';
import Typography from '../../../../../../../../../../../styles/__ready/Typography';

import useSelectedCell, {
  getSelectedCellSyle,
} from '../../../../../../../../../../../redux/project/selectedCell';
import { useDispatch, useSelector } from 'react-redux';
import { addEditEvent } from '../../../../../../../../../../../redux/project/edit_event_slice';
import { useState } from 'react';
import { getSelectedCell } from '../../../../../../../../../../../redux/project/selectedCell_slice';
import { useTranslation } from 'react-i18next';

const fonts = [
  {
    text: ' Arial',
    value: 'Arial',
  },
  {
    text: ' Ubuntu',
    value: 'Ubuntu',
  },
  {
    text: ' Roboto',
    value: "'Roboto Mono', monospace",
  },
  {
    text: ' Titr',
    value: 'Titr',
  },
  {
    text: ' Nazanin',
    value: 'Nazanin',
  },
];
export default function () {
  const dispatch = useDispatch();

  const Cell = useSelector(getSelectedCell);
  const selectedCell = getSelectedCellSyle();
  const { t } = useTranslation();
  function onClick(type = '', value = '') {
    dispatch(
      addEditEvent({
        type: type,
        itemId: Cell.frontId,
        value,
      })
    );
  }
  const SelectFont = () => {
    const [open, setOpen] = useState(false);
    function toggle() {
      setOpen(!open);
    }

    const FontsMenu = () => {
      return (
        <menu
          className={`position-absolute  flex-column`}
          style={{
            width: '224px',
            left: 0,
            top: '2.2rem',
            zIndex: '10',
            backgroundColor: '#ecececcc',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            display: open ? 'flex' : 'none',
          }}
        >
          {fonts.map((font, index) => {
            return (
              <span
                key={index}
                className="mt-2 w-100 border"
                onClick={() => onClick('FONT/CHANGE', font.value)}
              >
                {font.text}
              </span>
            );
          })}
          {/* <span
            className="mt-2 w-100 border"
            onClick={() => onClick('FONT/CHANGE', 'Arial')}
          >
            Arial
          </span>
          <span
            className="mt-2 w-100 border"
            onClick={() => onClick('FONT/CHANGE', 'Ubuntu')}
          >
            Ubuntu
          </span>
          <span
            className="mt-2 w-100 border"
            onClick={() => onClick("FONT/CHANGE", "Roboto Mono, monospace")}
          >
            Roboto
          </span>
          <span
            className="mt-2 w-100 border"
            onClick={() => onClick('FONT/CHANGE', 'Traffic')}
          >
            Traffic
          </span>
          <span
            className="mt-2 w-100 border"
            onClick={() => onClick('FONT/CHANGE', 'Titr')}
          >
            Titr
          </span>
          <span
            className="mt-2 w-100 border"
            onClick={() => onClick('FONT/CHANGE', 'Nazanin')}
          >
            Nazanin
          </span> */}
        </menu>
      );
    };
    return (
      <section
        className="editor-big-cell-box px-2 d-flex justify-content-between align-items-center "
        onClick={toggle}
      >
        <DropDown />

        <span
          style={{
            top: '0.15rem',
          }}
          className="h-100 d-flex justify-content-center align-items-center position-relative"
        >
          <Typography.H8>{selectedCell.fontFamily}</Typography.H8>
          <FontsMenu />
        </span>
        <div className="editor-small-info-cell-box">
          <Typography.H9>{t('editor.fontType')}</Typography.H9>
        </div>
      </section>
    );
  };

  const TextBoldBox = () => {
    return (
      <span
        onClick={() => onClick('FONT/STYLE', 'bold')}
        className={`editor-group-button-left-box d-flex justify-content-center align-item-center ${
          // selectedCell.fontStyle == "bold" && "opacity-4"
          selectedCell.fontStyle == 'bold' ? 'opacity-4' : ' '
        }`}
      >
        <TextBold />
      </span>
    );
  };
  const TextUnderLineBox = () => {
    return (
      <span
        onClick={() => onClick('FONT/STYLE', 'underline')}
        className={`editor-group-button-right-box  d-flex justify-content-center align-item-center ${
          // selectedCell.fontStyle == "bold" && "opacity-4"
          selectedCell.fontStyle == 'underline' && 'opacity-4'
        }`}
      >
        <TextUnderLine />
      </span>
    );
  };
  const TextItalicBox = () => {
    return (
      <span
        onClick={() => onClick('FONT/STYLE', 'italic')}
        className={`editor-group-button-center-box d-flex justify-content-center align-item-center ${
          // selectedCell.fontStyle == "bold" && "opacity-4"
          selectedCell.fontStyle == 'italic' && 'opacity-4'
        }`}
      >
        <TextItalic />
      </span>
    );
  };
  const TextJustify = () => {
    return (
      <section className="d-flex grop-box">
        <span
          onClick={() => onClick('FONT/ALIGN', 'right')}
          className={`editor-group-button-right-box d-flex justify-content-center align-item-center ${
            selectedCell.textAlign == 'right' && 'opacity-4'
          }`}
        >
          <TextRight />
        </span>
        <span
          onClick={() => onClick('FONT/ALIGN', 'center')}
          className={`editor-group-button-center-box d-flex justify-content-center align-item-center  ${
            selectedCell.textAlign == 'center' && 'opacity-4'
          }`}
        >
          <TextCenter />
        </span>
        <span
          onClick={() => onClick('FONT/ALIGN', 'left')}
          className={`editor-group-button-left-box d-flex justify-content-center align-item-center  ${
            selectedCell.textAlign == 'left' && 'opacity-4'
          }`}
        >
          <TextLeft />
        </span>

        <div className="editor-small-info-cell-box ">
          <Typography.H9>{t('editor.textAlignment')}</Typography.H9>
        </div>
      </section>
    );
  };
  return (
    <article className="">
      <header className="d-flex mb-2">
        <SelectFont />
      </header>
      <footer className="d-flex justify-content-between">
        <TextJustify />
        <section className="d-flex grop-box">
          <TextUnderLineBox />
          <TextItalicBox />
          <TextBoldBox />
          <div className="editor-small-info-cell-box ">
            <Typography.H9>{t('editor.textStyle')}</Typography.H9>
          </div>
        </section>
      </footer>
    </article>
  );
}
