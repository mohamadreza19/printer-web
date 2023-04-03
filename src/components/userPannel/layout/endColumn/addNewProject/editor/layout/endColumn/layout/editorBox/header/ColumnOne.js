import {
  JoinColumn,
  JoinRow,
  SpliteColumn,
  SpliteRow,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";

export default function () {
  return (
    <article
      className="  h-100 "
      style={{
        width: "13.33333333333333%",
        borderLeft: "2px solid #B7B7B7",
      }}
    >
      <header className="w-100 h-50 d-flex  px-2 pb-1 ">
        <section
          style={{ width: "50%", height: "100%" }}
          className="me-2 border-10 bg_gray1 d-flex justify-content-center align-items-center"
        >
          <SpliteRow />
        </section>
        <section
          className="border-10 bg_gray1 d-flex justify-content-center align-items-center"
          style={{ width: "50%", height: "100%" }}
        >
          <JoinRow />
        </section>
      </header>
      <footer className="w-100 h-50 d-flex  px-2 pt-1">
        <section
          style={{ width: "50%", height: "100%" }}
          className="me-2 border-10 bg_gray1 d-flex justify-content-center align-items-center"
        >
          <SpliteColumn />
        </section>
        <section
          className="border-10 bg_gray1  d-flex justify-content-center align-items-center"
          style={{ width: "50%", height: "100%" }}
        >
          <JoinColumn />
        </section>
      </footer>
    </article>
  );
}
