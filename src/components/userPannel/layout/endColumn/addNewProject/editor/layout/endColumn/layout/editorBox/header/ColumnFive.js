import {
  Barcode,
  Delete,
  Duplicate,
  OneTwo,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";

export default function () {
  return (
    <article
      className="  h-100 "
      style={{
        width: "13.33333333333333%",
        borderRightr: "2px solid black",
      }}
    >
      <header className="w-98 h-50 d-flex  px-2 pb-1 ">
        <section
          style={{ width: "50%", height: "100%" }}
          className="me-2 border-10 bg_gray1 d-flex justify-content-center align-items-center"
        >
          <Delete />
        </section>
        <section
          className="border-10 bg_gray1 d-flex justify-content-center align-items-center"
          style={{ width: "50%", height: "100%" }}
        >
          <Duplicate />
        </section>
      </header>
      <footer className="w-98 h-50 d-flex  px-2 pt-1">
        <section
          style={{ width: "50%", height: "100%" }}
          className="me-2 border-10 bg_gray1 d-flex justify-content-center align-items-center"
        >
          <OneTwo />
        </section>
        <section
          className="border-10 bg_gray1 d-flex justify-content-center align-items-center"
          style={{ width: "50%", height: "100%" }}
        >
          <Barcode />
        </section>
      </footer>
    </article>
  );
}
