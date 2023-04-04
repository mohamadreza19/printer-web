import {
  LeftToRight,
  Redo,
  RightToLeft,
  Undo,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";

export default function () {
  return (
    <article className="">
      <header className="d-flex mb-2">
        <section className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center">
          <Redo />
        </section>
        <section className="editor-small-cell-box d-flex justify-content-center align-items-center">
          <Undo />
        </section>
      </header>
      <footer className="d-flex">
        <section className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center">
          <RightToLeft />
        </section>
        <section className="editor-small-cell-box d-flex justify-content-center align-items-center">
          <LeftToRight />
        </section>
      </footer>
    </article>
  );
}
