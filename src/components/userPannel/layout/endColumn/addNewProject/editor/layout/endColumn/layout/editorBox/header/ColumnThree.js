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

export default function () {
  const cssClass = useDynamicCssClass();
  const [fontSizeAction, setFontSizeAction] =
    useRecoilState(ColumnThree_fontSize);
  const [fontAngle, setFontAngle] = useRecoilState(ColumnThree_angle);
  const [cellMargin, setCellMargin] = useRecoilState(ColumnThree_margin);
  const [cellPadding, setCellPadding] = useRecoilState(ColumnThree_padding);
  const cellForReadStyle = useRecoilValue(selectedCellForReadStyle);
  const _interval_Margin_Ref = useRef(null);
  const _interval_Padding_Ref = useRef(null);
  const _interval_Angle_Ref = useRef(null);
  const TextChangeSizeBox = () => {
    function onClick(action) {
      if (action == "increment") {
        setFontSizeAction({
          chosenAction: "increment",
          isUsed: true,
        });
      }
      if (action == "decrement") {
        setFontSizeAction({
          chosenAction: "decrement",
          isUsed: true,
        });
      }
    }

    return (
      <section className="editor-medium-cell-box px-2 me-2 d-flex align-items-center justify-content-between ">
        <TextSize />
        <Typography.H9 className={" ms-2 "} language="en">
          {cellForReadStyle.fontSize}
        </Typography.H9>
        <div className="d-flex flex-column  justify-content-center ">
          <span
            className="d-flex justify-content-center"
            onClick={() => onClick("increment")}
          >
            <Up />
          </span>
          <span
            className="d-flex justify-content-center"
            onClick={() => onClick("decrement")}
          >
            <Down />
          </span>
        </div>
      </section>
    );
  };
  const ChangeMarginBox = () => {
    function onClick(action) {
      if (action == "increment") {
        setCellMargin({
          chosenAction: "increment",
          isUsed: true,
        });
      }
      if (action == "decrement") {
        setCellMargin({
          chosenAction: "decrement",
          isUsed: true,
        });
      }
    }
    return (
      <section className="editor-medium-cell-box px-2 me-2 d-flex align-items-center justify-content-between ">
        <CubeSpace />
        <Typography.H9 className={" ms-2 "} language="en">
          {cellForReadStyle.margin || 0}
        </Typography.H9>
        <div className="d-flex flex-column  justify-content-center ">
          <span
            className="d-flex justify-content-center"
            onClick={() => onClick("increment")}
            onMouseDown={() => {
              _interval_Margin_Ref.current = setInterval(() => {
                onClick("increment");
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
            onClick={() => onClick("decrement")}
            onMouseDown={() => {
              _interval_Margin_Ref.current = setInterval(() => {
                onClick("decrement");
                console.log("sel");
              }, 100);
            }}
            onMouseUp={() => {
              clearInterval(_interval_Margin_Ref.current);
            }}
          >
            <Down />
          </span>
        </div>
      </section>
    );
  };
  const TextAngleBox = () => {
    function onClick(action) {
      if (action == "increment") {
        setFontAngle({
          chosenAction: "increment",
          isUsed: true,
        });
      }
      if (action == "decrement") {
        setFontAngle({
          chosenAction: "decrement",
          isUsed: true,
        });
      }
    }
    return (
      <section className="editor-medium-cell-box px-2 me-2 d-flex align-items-center justify-content-between ">
        <Angle />
        <main className="position-relative">
          <Typography.H9 className={" ms-2  "} language="en">
            {cellForReadStyle.angle || 0}
          </Typography.H9>
          <span className="editor-angle-symbol">°</span>
        </main>
        <div className="d-flex flex-column  justify-content-center ">
          <span
            className="d-flex justify-content-center"
            onClick={() => onClick("increment")}
            onMouseDown={() => {
              _interval_Angle_Ref.current = setInterval(() => {
                onClick("increment");
                console.log("sel");
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
            onClick={() => onClick("decrement")}
            onMouseDown={() => {
              _interval_Angle_Ref.current = setInterval(() => {
                onClick("decrement");
                console.log("sel");
              }, 100);
            }}
            onMouseUp={() => {
              clearInterval(_interval_Angle_Ref.current);
            }}
          >
            <Down />
          </span>
        </div>
      </section>
    );
  };
  const ChangePaddingBox = () => {
    function onClick(action) {
      if (action == "increment") {
        setCellPadding({
          chosenAction: "increment",
          isUsed: true,
        });
      }
      if (action == "decrement") {
        setCellPadding({
          chosenAction: "decrement",
          isUsed: true,
        });
      }
    }
    return (
      <section className="editor-medium-cell-box px-2  d-flex align-items-center justify-content-between ">
        <Text />
        <Typography.H9 className={" ms-2 "} language="en">
          {cellForReadStyle.padding || 0}
        </Typography.H9>
        <div className="d-flex flex-column  justify-content-center ">
          <span
            className="d-flex justify-content-center"
            onClick={() => onClick("increment")}
            onMouseDown={() => {
              _interval_Padding_Ref.current = setInterval(() => {
                onClick("increment");
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
            onClick={() => onClick("decrement")}
            onMouseDown={() => {
              _interval_Padding_Ref.current = setInterval(() => {
                onClick("decrement");
                console.log("sel");
              }, 100);
            }}
            onMouseUp={() => {
              clearInterval(_interval_Padding_Ref.current);
            }}
          >
            <Down />
          </span>
        </div>
      </section>
    );
  };
  return (
    <article className="mx-2 ">
      <header className="d-flex mb-2 ">
        <TextChangeSizeBox />
        <ChangeMarginBox />
      </header>
      <footer className="d-flex ">
        <TextAngleBox />
        <ChangePaddingBox />
      </footer>
    </article>
  );
}
