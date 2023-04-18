import { useRecoilState, useRecoilValue } from "recoil";
import {
  DropDown,
  TextBold,
  TextCenter,
  TextItalic,
  TextLeft,
  TextRight,
  TextUnderLine,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../../styles/__ready/Typography";
import {
  ColumnTwo_font,
  ColumnTwo_textBold,
} from "../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import { SelectedRootCell } from "../../../../../../../../../../../recoil/userEditorStore/cellsStore";

export default function () {
  const [font, setFont] = useRecoilState(ColumnTwo_font);
  const [textBold, setTextBold] = useRecoilState(ColumnTwo_textBold);

  const selectedRoot = useRecoilValue(SelectedRootCell);

  const SelectFont = () => {
    function onClick() {
      setFont((draft) => ({
        ...draft,
        isShow: !font.isShow,
      }));
    }
    const FontsMenu = () => {
      return (
        <menu
          className={`position-absolute  ${
            font.isShow ? "d-flex" : "d-none"
          } flex-column`}
          style={{
            width: "224px",
            left: 0,
            top: "2.2rem",
            zIndex: "10",
            backgroundColor: "#ecececcc",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            display: "",
          }}
        >
          <span
            className="mt-2 w-100 border"
            onClick={() => {
              setFont((draft) => ({
                ...draft,
                font: "Arial",
                isOnClick: true,
              }));
            }}
          >
            Arial
          </span>
          <span
            className="mt-2 w-100 border"
            onClick={() => {
              setFont((draft) => ({
                ...draft,
                font: "Ubuntu",
                isOnClick: true,
              }));
            }}
          >
            Ubuntu
          </span>
          <span
            className="mt-2 w-100 border"
            onClick={() => {
              setFont((draft) => ({
                ...draft,
                font: "Roboto",
                isOnClick: true,
              }));
            }}
          >
            Roboto
          </span>
          <span
            className="mt-2 w-100 border"
            onClick={() => {
              setFont((draft) => ({
                ...draft,
                font: "DynaPuff",
                isOnClick: true,
              }));
            }}
          >
            DynaPuff
          </span>
        </menu>
      );
    };
    return (
      <section
        className="editor-big-cell-box px-2 d-flex justify-content-between align-items-center position-relative"
        onClick={onClick}
      >
        <DropDown />

        <span
          style={{
            top: "0.15rem",
          }}
          className="h-100 d-flex justify-content-center align-items-center position-relative"
        >
          <Typography.H8>{selectedRoot.fontFamily}</Typography.H8>
          <FontsMenu />
        </span>
      </section>
    );
  };
  const TextBoldBox = () => {
    function onClick() {
      setTextBold(!textBold);
    }
    return (
      <span
        onClick={onClick}
        className={`editor-group-button-left-box d-flex justify-content-center align-item-center ${
          selectedRoot.fontStyle == "bold" && "opacity-4"
        }`}
      >
        <TextBold />
      </span>
    );
  };
  return (
    <article className="">
      <header className="d-flex mb-2">
        <SelectFont />
      </header>
      <footer className="d-flex justify-content-between">
        <section className="d-flex ">
          <span className="editor-group-button-right-box d-flex justify-content-center align-item-center">
            <TextRight />
          </span>
          <span className="editor-group-button-center-box d-flex justify-content-center align-item-center ">
            <TextCenter />
          </span>
          <span className="editor-group-button-left-box d-flex justify-content-center align-item-center">
            <TextLeft />
          </span>
        </section>
        <section className="d-flex">
          <span className="editor-group-button-right-box d-flex justify-content-center align-item-center">
            <TextUnderLine />
          </span>
          <span className="editor-group-button-center-box d-flex justify-content-center align-item-center">
            <TextItalic />
          </span>
          <TextBoldBox />
        </section>
      </footer>
    </article>
  );
}
