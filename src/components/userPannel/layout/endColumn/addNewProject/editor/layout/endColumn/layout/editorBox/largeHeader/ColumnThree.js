import { useRecoilState, useRecoilValue } from "recoil";
import { useDynamicCssClass } from "../../../../../../../../../../../recoil/readStore";
import {
  Angle,
  CubeSpace,
  Down,
  Text,
  TextSize,
  Up,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../../styles/__ready/Typography";
import {
  ColumnThree_angle,
  ColumnThree_fontSize,
  ColumnThree_margin,
  ColumnThree_padding,
} from "../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import { selectedCellForReadStyle } from "../../../../../../../../../../../recoil/userEditorStore/cellsStore";
import { useRef } from "react";
import useSelectedCell, {
  getSelectedCellSyle,
} from "../../../../../../../../../../../redux/project/selectedCell";
import { useDispatch } from "react-redux";
import { addEditEvent } from "../../../../../../../../../../../redux/project/edit_event_slice";

export default function () {
  const dispatch = useDispatch();

  const Cell = useSelectedCell("get");
  const selectedCellStyle = getSelectedCellSyle();
  const _interval_Margin_Ref = useRef(null);
  const _interval_Padding_Ref = useRef(null);
  const _interval_Angle_Ref = useRef(null);
  const _interval_TextSize_Ref = useRef(null);
  function onClick(type = "") {
    dispatch(
      addEditEvent({
        type: type,
        itemId: Cell.frontId,
      })
    );
  }
  function onChange(event, type = "") {
    const value = Number(event.target.value);
    dispatch(
      addEditEvent({
        type: type,
        itemId: Cell.frontId,
        value: value,
      })
    );
  }

  return (
    <article className="mx-2 ">
      <header className="d-flex mb-2 ">
        <TextChangeSizeBox
          _interval_TextSize_Ref={_interval_TextSize_Ref}
          onChange={onChange}
          onClick={onClick}
          value={selectedCellStyle.fontSize}
        />
        <ChangeMarginBox
          _interval_Margin_Ref={_interval_Margin_Ref}
          onChange={onChange}
          onClick={onClick}
          value={selectedCellStyle.margin}
        />
      </header>
      <footer className="d-flex ">
        <TextAngleBox
          _interval_Angle_Ref={_interval_Angle_Ref}
          onChange={onChange}
          onClick={onClick}
          value={selectedCellStyle.angle}
        />
        <ChangePaddingBox
          _interval_Padding_Ref={_interval_Padding_Ref}
          onChange={onChange}
          onClick={onClick}
          value={selectedCellStyle.padding}
        />
      </footer>
    </article>
  );
}
const TextAngleBox = ({
  _interval_Angle_Ref,
  onChange = () => {},
  onClick = () => {},
  value = 0,
}) => {
  return (
    <section className="editor-medium-cell-box px-2 me-2 d-flex align-items-center justify-content-between ">
      <Angle />

      <main className="position-relative">
        <span className="editor-angle-symbol">°</span>
        <input
          onChange={(event) => onChange(event, "ANGLE")}
          type="number"
          className="custom-input-editor "
          value={value}
        />
      </main>
      <div className="d-flex flex-column  justify-content-center ">
        <span
          className="d-flex justify-content-center"
          onClick={() => onClick("ANGLE/INCREMENT")}
          onMouseDown={() => {
            _interval_Angle_Ref.current = setInterval(() => {
              onClick("ANGLE/INCREMENT");
            }, 100);
          }}
          onMouseUp={() => {
            clearInterval(_interval_Angle_Ref.current);
          }}
        >
          <Up />
        </span>
        <span
          className="d-flex justify-content-center"
          onClick={() => onClick("ANGLE/DECREMENT")}
          onMouseDown={() => {
            _interval_Angle_Ref.current = setInterval(() => {
              onClick("ANGLE/DECREMENT");
            }, 100);
          }}
          onMouseUp={() => {
            clearInterval(_interval_Angle_Ref.current);
          }}
        >
          <Down />
        </span>
      </div>
      <div className="editor-small-info-cell-box ">
        <Typography.H9>زاویه</Typography.H9>
      </div>
    </section>
  );
};
const TextChangeSizeBox = ({
  _interval_TextSize_Ref,
  onChange = () => {},
  onClick = () => {},
  value = 0,
}) => {
  return (
    <section className="editor-medium-cell-box px-2 me-2 d-flex align-items-center justify-content-between ">
      <TextSize />
      <input
        onChange={(event) => onChange(event, "TEXTSIZE")}
        type="number"
        className="custom-input-editor "
        value={value}
      />
      {/* <Typography.H9 className={" ms-2 "} language="en">
        {cellForReadStyle.fontSize}
      </Typography.H9> */}
      <div className="d-flex flex-column  justify-content-center ">
        <span
          onMouseDown={() => {
            _interval_TextSize_Ref.current = setInterval(() => {
              onClick("TEXTSIZE/INCREMENT");
            }, 100);
          }}
          onMouseUp={() => {
            clearInterval(_interval_TextSize_Ref.current);
          }}
          className="d-flex justify-content-center"
          onClick={() => onClick("TEXTSIZE/INCREMENT")}
        >
          <Up />
        </span>
        <span
          onMouseDown={() => {
            _interval_TextSize_Ref.current = setInterval(() => {
              onClick("TEXTSIZE/DECREMENT");
            }, 100);
          }}
          onMouseUp={() => {
            clearInterval(_interval_TextSize_Ref.current);
          }}
          className="d-flex justify-content-center"
          onClick={() => onClick("TEXTSIZE/DECREMENT")}
        >
          <Down />
        </span>
      </div>
      <div className="editor-small-info-cell-box ">
        <Typography.H9>اندازه متن</Typography.H9>
      </div>
    </section>
  );
};
const ChangeMarginBox = ({
  _interval_Margin_Ref,
  onChange = () => {},
  onClick = () => {},
  value = 0,
}) => {
  return (
    <section className="editor-medium-cell-box px-2 me-2 d-flex align-items-center justify-content-between ">
      <CubeSpace />
      <input
        onChange={(event) => onChange(event, "MARGIN")}
        type="number"
        className="custom-input-editor "
        value={value}
      />

      <div className="d-flex flex-column  justify-content-center ">
        <span
          className="d-flex justify-content-center"
          onClick={() => onClick("MARGIN/INCREMENT")}
          onMouseDown={() => {
            _interval_Margin_Ref.current = setInterval(() => {
              onClick("MARGIN/INCREMENT");
            }, 100);
          }}
          onMouseUp={() => {
            clearInterval(_interval_Margin_Ref.current);
          }}
        >
          <Up />
        </span>
        <span
          className="d-flex justify-content-center"
          onClick={() => onClick("MARGIN/DECREMENT")}
          onMouseDown={() => {
            _interval_Margin_Ref.current = setInterval(() => {
              onClick("MARGIN/DECREMENT");
            }, 100);
          }}
          onMouseUp={() => {
            clearInterval(_interval_Margin_Ref.current);
          }}
        >
          <Down />
        </span>
      </div>
      <div className="editor-small-info-cell-box ">
        <Typography.H9>مارجین</Typography.H9>
      </div>
    </section>
  );
};
const ChangePaddingBox = ({
  _interval_Padding_Ref,
  onChange = () => {},
  onClick = () => {},
  value = 0,
}) => {
  return (
    <section className="editor-medium-cell-box px-2  d-flex align-items-center justify-content-between ">
      <Text />
      <input
        onChange={(event) => onChange(event, "PADDING")}
        type="number"
        className="custom-input-editor "
        value={value}
      />
      {/* <Typography.H9 className={" ms-2 "} language="en">
        {cellForReadStyle.padding || 0}
      </Typography.H9> */}
      <div className="d-flex flex-column  justify-content-center ">
        <span
          className="d-flex justify-content-center"
          onClick={() => onClick("PADDING/INCREMENT")}
          onMouseDown={() => {
            _interval_Padding_Ref.current = setInterval(() => {
              onClick("PADDING/INCREMENT");
            }, 100);
          }}
          onMouseUp={() => {
            clearInterval(_interval_Padding_Ref.current);
          }}
        >
          <Up />
        </span>
        <span
          className="d-flex justify-content-center"
          onClick={() => onClick("PADDING/DECREMENT")}
          onMouseDown={() => {
            _interval_Padding_Ref.current = setInterval(() => {
              onClick("PADDING/DECREMENT");
            }, 100);
          }}
          onMouseUp={() => {
            clearInterval(_interval_Padding_Ref.current);
          }}
        >
          <Down />
        </span>
      </div>
      <div className="editor-small-info-cell-box ">
        <Typography.H9>پدینگ</Typography.H9>
      </div>
    </section>
  );
};
