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

export default function () {
  return (
    <article className="">
      <header className="d-flex mb-2">
        <section className="editor-big-cell-box px-2 d-flex justify-content-between align-items-center">
          <DropDown />

          <Typography.H8>Arial</Typography.H8>
        </section>
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
          <span className="editor-group-button-left-box d-flex justify-content-center align-item-center">
            <TextBold />
          </span>
        </section>
      </footer>
    </article>
  );
}
