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
import { useDispatch, useSelector } from "react-redux";
import {
  getPossibleRedo,
  getPossibleUndo,
  redo,
  reverseCustomLabels,
  undo,
} from "../../../../../../../../../../../redux/project/history_changer_slice";
import { addEditEvent } from "../../../../../../../../../../../redux/project/edit_event_slice";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function () {
  const dispatch = useDispatch();
  const possibleUndo = useSelector(getPossibleUndo);
  const possibleRedo = useSelector(getPossibleRedo);
  const [justify, setJustify] = useState("left");
  const { t } = useTranslation();

  function handleRedo() {
    if (possibleRedo) {
      dispatch(redo());
    }
  }
  function handleUndo() {
    if (possibleUndo) {
      dispatch(undo());
    }
  }
  const JustifyRealBox = () => {
    function onClick(justify = "") {
      switch (justify) {
        case "right":
          setJustify("right");
          dispatch(reverseCustomLabels());
          break;
        case "left":
          setJustify("left");
          dispatch(reverseCustomLabels());
          break;
      }
    }

    return (
      <footer className="d-flex">
        <article className="position-relative">
          <section
            onClick={() => {
              onClick("right");
            }}
            className="cell-regular"
          >
            <div
              className={`editor-small-cell-box me-2 d-flex justify-content-center align-items-center ${
                justify == "right" && "opacity-4"
              }`}
            >
              <RightToLeft />
            </div>
            <div className="editor-small-info-cell-box">
              <Typography.H9>{t("addNewProject.rtl")}</Typography.H9>
            </div>
          </section>
        </article>
        <article className="position-relative">
          <section
            onClick={() => {
              onClick("left");
            }}
            className="cell-regular"
          >
            <div
              className={`editor-small-cell-box d-flex justify-content-center align-items-center ${
                justify == "left" && "opacity-4"
              }`}
            >
              <LeftToRight />
            </div>
            <div className="editor-small-info-cell-box">
              <Typography.H9>{t("addNewProject.ltr")}</Typography.H9>
            </div>
          </section>
        </article>
      </footer>
    );
  };
  const RedoBox = () => {
    return (
      <article className="position-relative">
        <section onClick={handleRedo} className="cell-regular">
          <div
            className={`editor-small-cell-box me-2 d-flex justify-content-center align-items-center ${
              possibleRedo ? "" : "opacity-4"
            }`}
          >
            <Redo />
          </div>
          <div className="editor-small-info-cell-box">
            <Typography.H9>{t("editor.goForward")}</Typography.H9>
          </div>
        </section>
      </article>
    );
  };
  const UndoBox = () => {
    return (
      <article className="position-relative">
        <section onClick={handleUndo} className="cell-regular">
          <div
            className={`editor-small-cell-box d-flex justify-content-center align-items-center ${
              possibleUndo ? "" : "opacity-4"
            }`}
          >
            <Undo />
          </div>
          <div className="editor-small-info-cell-box">
            <Typography.H9>{t("editor.goBack")}</Typography.H9>
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
