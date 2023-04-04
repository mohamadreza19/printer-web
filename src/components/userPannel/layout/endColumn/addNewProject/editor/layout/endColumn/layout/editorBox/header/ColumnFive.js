import {
  Barcode,
  Delete,
  Duplicate,
  OneTwo,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";

export default function () {
  return (
    <article className="">
      <header className="d-flex mb-2">
        <section className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center">
          <Delete />
        </section>
        <section className="editor-small-cell-box d-flex justify-content-center align-items-center">
          <Duplicate />
        </section>
      </header>
      <footer className="d-flex">
        <section className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center">
          <OneTwo />
        </section>
        <section className="editor-small-cell-box  d-flex justify-content-center align-items-center">
          <Barcode />
        </section>
      </footer>
    </article>
  );
}
