import {
  JoinColumn,
  JoinRow,
  SpliteColumn,
  SpliteRow,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";

export default function () {
  return (
    <article className="">
      <header className="d-flex mb-2">
        <section className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center">
          <SpliteRow />
        </section>
        <section className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center">
          <JoinRow />
        </section>
      </header>
      <footer className="d-flex">
        <section className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center">
          <SpliteColumn />
        </section>
        <section className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center">
          <JoinColumn />
        </section>
      </footer>
    </article>
  );
}
