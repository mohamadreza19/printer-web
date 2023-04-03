import {
  DropDown,
  TextBold,
  TextCenter,
  TextItalic,
  TextLeft,
  TextRight,
  TextUnderLine,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";

export default function () {
  return (
    <article className=" h-100" style={{ width: "30%" }}>
      <header className="w-100 h-50 ps-2 pb-1">
        <section className="w-100 h-100 bg_gray1 border-r-10 d-flex justify-content-between align-items-center px-3">
          <header className="d-flex align-items-center">
            <DropDown />
          </header>
          <footer className="d-flex align-items-center">
            <span
              style={{
                fontSize: "140%",
                fontWeight: "400",
              }}
            >
              Arial
            </span>
          </footer>
        </section>
      </header>
      <footer className="w-100 h-50 ps-2 d-flex pt-1">
        <section className="w-50 h-100   border-r-10 me-2 d-flex">
          <div
            style={{
              width: "33.33333333333333%",
              height: "100%",
              backgroundColor: "#D8D8D8",
              borderRadius: "0 12px 12px 0",
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <TextRight />
          </div>
          <div
            style={{
              width: "33.33333333333333%",
              height: "100%",
              backgroundColor: "#ECECEC",
              borderRadius: "",
            }}
            className="mx-0_1rem d-flex justify-content-center align-items-center"
          >
            <TextCenter />
          </div>
          <div
            style={{
              width: "33.33333333333333%",
              height: "100%",
              backgroundColor: "#ECECEC",
              borderRadius: "12px 0 0 12px",
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <TextLeft />
          </div>
        </section>
        <section className="w-50 h-100  border-r-10 d-flex">
          <div
            style={{
              width: "33.33333333333333%",
              height: "100%",
              backgroundColor: "#D8D8D8",
              borderRadius: "0 12px 12px 0",
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <TextUnderLine />
          </div>
          <div
            style={{
              width: "33.33333333333333%",
              height: "100%",
              backgroundColor: "#ECECEC",
              borderRadius: "",
            }}
            className="mx-0_1rem d-flex justify-content-center align-items-center"
          >
            <TextItalic />
          </div>
          <div
            style={{
              width: "33.33333333333333%",
              height: "100%",
              backgroundColor: "#ECECEC",
              borderRadius: "12px 0 0 12px",
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <TextBold />
          </div>
        </section>
      </footer>
    </article>
  );
}
