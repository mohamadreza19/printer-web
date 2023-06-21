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
  ColumnThree_FontStyle,
  ColumnTwo_TextAlign,
  ColumnTwo_font,
} from "../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import { selectedCellForReadStyle } from "../../../../../../../../../../../recoil/userEditorStore/cellsStore";

export default function () {
  const [font, setFont] = useRecoilState(ColumnTwo_font);
  const [fontStyle, setFontStyle] = useRecoilState(ColumnThree_FontStyle);
  const [textAlign, setTextAlign] = useRecoilState(ColumnTwo_TextAlign);

  const cellForReadStyle = useRecoilValue(selectedCellForReadStyle);

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
          <Typography.H8>{cellForReadStyle.fontFamily}</Typography.H8>
          <FontsMenu />
        </span>
        <div className="editor-small-info-cell-box">
          <Typography.H9>ادغام ستون</Typography.H9>
        </div>
      </section>
    );
  };

  const TextBoldBox = () => {
    function onClick() {
      setFontStyle((draft) => {
        if (cellForReadStyle.fontStyle == "regular") {
          return {
            chosenStyle: "bold",
            isUsed: true,
          };
        }
        if (cellForReadStyle.fontStyle == "bold") {
          console.log("is bold");
          return {
            chosenStyle: "regular",
            isUsed: true,
          };
        }
        return {
          chosenStyle: "bold",
          isUsed: true,
        };
      });
    }
    return (
      <span
        onClick={onClick}
        className={`editor-group-button-left-box d-flex justify-content-center align-item-center ${
          // cellForReadStyle.fontStyle == "bold" && "opacity-4"
          fontStyle.chosenStyle == "bold" ? "opacity-4" : " "
        }`}
      >
        <TextBold />
      </span>
    );
  };
  const TextUnderLineBox = () => {
    function onClick() {
      setFontStyle((draft) => {
        if (cellForReadStyle.fontStyle == "regular") {
          return {
            chosenStyle: "underline",
            isUsed: true,
          };
        }
        if (cellForReadStyle.fontStyle == "underline") {
          return {
            chosenStyle: "regular",
            isUsed: true,
          };
        }
        return {
          chosenStyle: "underline",
          isUsed: true,
        };
      });
    }
    return (
      <span
        onClick={onClick}
        className={`editor-group-button-right-box  d-flex justify-content-center align-item-center ${
          // cellForReadStyle.fontStyle == "bold" && "opacity-4"
          fontStyle.chosenStyle == "underline" && "opacity-4"
        }`}
      >
        <TextUnderLine />
      </span>
    );
  };
  const TextItalicBox = () => {
    function onClick() {
      setFontStyle((draft) => {
        if (cellForReadStyle.fontStyle == "regular") {
          return {
            chosenStyle: "italic",
            isUsed: true,
          };
        }
        if (cellForReadStyle.fontStyle == "italic") {
          console.log("isbold");
          return {
            chosenStyle: "regular",
            isUsed: true,
          };
        }
        return {
          chosenStyle: "italic",
          isUsed: true,
        };
      });
    }
    return (
      <span
        onClick={onClick}
        className={`editor-group-button-center-box d-flex justify-content-center align-item-center ${
          // cellForReadStyle.fontStyle == "bold" && "opacity-4"
          fontStyle.chosenStyle == "italic" && "opacity-4"
        }`}
      >
        <TextItalic />
      </span>
    );
  };
  const TextJustify = () => {
    function onClickRight() {
      setTextAlign((draft) => {
        return {
          chosenAlign: "right",
          isUsed: true,
        };
      });
    }
    function onClickCenter() {
      setTextAlign((draft) => {
        return {
          chosenAlign: "center",
          isUsed: true,
        };
      });
    }
    function onClickLeft() {
      setTextAlign((draft) => {
        return {
          chosenAlign: "left",
          isUsed: true,
        };
      });
    }

    return (
      <section className="d-flex ">
        <span
          onClick={onClickRight}
          className={`editor-group-button-right-box d-flex justify-content-center align-item-center ${
            cellForReadStyle.textAlign == "right" && "opacity-4"
          }`}
        >
          <TextRight />
        </span>
        <span
          onClick={onClickCenter}
          className={`editor-group-button-center-box d-flex justify-content-center align-item-center  ${
            cellForReadStyle.textAlign == "center" && "opacity-4"
          }`}
        >
          <TextCenter />
        </span>
        <span
          onClick={onClickLeft}
          className={`editor-group-button-left-box d-flex justify-content-center align-item-center  ${
            cellForReadStyle.textAlign == "left" && "opacity-4"
          }`}
        >
          <TextLeft />
        </span>
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
        <section className="d-flex">
          <TextUnderLineBox />
          <TextItalicBox />
          <TextBoldBox />
        </section>
      </footer>
    </article>
  );
}
