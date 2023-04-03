import { Grid } from "@mui/material";
import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import {
  Angle,
  Barcode,
  CubeSpace,
  Delete,
  Down,
  DropDown,
  Duplicate,
  JoinColumn,
  JoinRow,
  LeftToRight,
  OneTwo,
  Redo,
  RightToLeft,
  SpliteColumn,
  SpliteRow,
  Text,
  TextBold,
  TextCenter,
  TextItalic,
  TextLeft,
  TextRight,
  TextSize,
  TextUnderLine,
  Undo,
  Up,
} from "../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();

  return (
    <div className="bg-white border-r-top-20 dir-rtl">
      <div
        style={{
          width: "100%",
          height: "15.17vh",
          padding: "0 2rem",
        }}
        className=" bg_gray2  border-r-20 d-flex align-items-center py-4"
      >
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
        <article className=" h-100" style={{ width: "30%" }}>
          <header className="w-100 h-50 ps-2 pb-1">
            <section className="w-100 h-100 bg_gray1 border-r-10 d-flex justify-content-between align-items-center px-2">
              <header className="d-flex align-items-center">
                <DropDown />
              </header>
              <footer className="d-flex align-items-center">
                <span
                  style={{
                    fontSize: "140%",
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
        <article
          className=" h-100"
          style={{ width: "30%", borderLeft: "2px solid #B7B7B7" }}
        >
          <header className="w-100 h-50   d-flex px-2 pb-1">
            <section className="w-50 h-100  bg_gray1 me-2 border-r-10 px-2 d-flex justify-content-between align-items-center">
              <div className="w-50 h-100 ">
                <span className="h-100  d-flex align-items-center ps-2">
                  <TextSize />
                </span>
              </div>
              <section className="w-50 h-100  d-flex align-items-center justify-content-between ">
                <div className="w-50 h-100   d-flex justify-content-center align-item-center me-2 position-relative">
                  {/* <Typography.H9
                    children={14}
                    language="en"
                    className="margin-left-0_8rem"
                  /> */}
                  <p
                    style={{
                      fontSize: "150%",
                      position: "absolute",
                    }}
                  >
                    14
                  </p>
                </div>
                <main className="w-50 h-100  d-flex justify-content-center align-item-center">
                  <div className="w-100 h-100   ">
                    <section className="w-100 h-50  d-flex justify-content-center align-items-center ">
                      <Up />
                    </section>
                    <section className="w-100 h-50  d-flex justify-content-center align-items-center ">
                      <Down />
                    </section>
                  </div>
                </main>
              </section>
            </section>
            <section className="w-50 h-100  bg_gray1  border-r-10 px-2 d-flex justify-content-between align-items-center">
              <div className="w-50 h-100 ">
                <span className="h-100  d-flex align-items-center ps-2">
                  <CubeSpace />
                </span>
              </div>
              <section className="w-50 h-100  d-flex align-items-center justify-content-between ">
                <div className="w-50 h-100   d-flex justify-content-center align-item-center me-2 position-relative">
                  {/* <Typography.H9
                    children={14}
                    language="en"
                    className="margin-left-0_8rem"
                  /> */}
                  <p
                    style={{
                      fontSize: "150%",
                      position: "absolute",
                    }}
                  >
                    14
                  </p>
                </div>
                <main className="w-50 h-100  d-flex justify-content-center align-item-center">
                  <div className="w-100 h-100   ">
                    <section className="w-100 h-50  d-flex justify-content-center align-items-center ">
                      <Up />
                    </section>
                    <section className="w-100 h-50  d-flex justify-content-center align-items-center ">
                      <Down />
                    </section>
                  </div>
                </main>
              </section>
            </section>
          </header>
          <footer className="w-100 h-50   d-flex px-2 pt-1">
            <section className="w-50 h-100  bg_gray1 me-2 border-r-10 px-2 d-flex justify-content-between align-items-center">
              <div className="w-50 h-100 ">
                <span className="h-100  d-flex align-items-center ps-2">
                  <Angle />
                </span>
              </div>
              <section className="w-50 h-100  d-flex align-items-center justify-content-between ">
                <div className="w-50 h-100   d-flex justify-content-center align-item-center me-2 position-relative">
                  {/* <Typography.H9
                    children={14}
                    language="en"
                    className="margin-left-0_8rem"
                  /> */}
                  <p
                    style={{
                      fontSize: "150%",
                      position: "absolute",
                    }}
                  >
                    14
                  </p>
                </div>
                <main className="w-50 h-100  d-flex justify-content-center align-item-center">
                  <div className="w-100 h-100   ">
                    <section className="w-100 h-50  d-flex justify-content-center align-items-center ">
                      <Up />
                    </section>
                    <section className="w-100 h-50  d-flex justify-content-center align-items-center ">
                      <Down />
                    </section>
                  </div>
                </main>
              </section>
            </section>
            <section className="w-50 h-100  bg_gray1  border-r-10 px-2 d-flex justify-content-between align-items-center">
              <div className="w-50 h-100 ">
                <span className="h-100  d-flex align-items-center ps-2">
                  <Text />
                </span>
              </div>
              <section className="w-50 h-100  d-flex align-items-center justify-content-between ">
                <div className="w-50 h-100   d-flex justify-content-center align-item-center me-2 position-relative">
                  {/* <Typography.H9
                    children={14}
                    language="en"
                    className="margin-left-0_8rem"
                  /> */}
                  <p
                    style={{
                      fontSize: "150%",
                      position: "absolute",
                    }}
                  >
                    14
                  </p>
                </div>
                <main className="w-50 h-100  d-flex justify-content-center align-item-center">
                  <div className="w-100 h-100   ">
                    <section className="w-100 h-50  d-flex justify-content-center align-items-center ">
                      <Up />
                    </section>
                    <section className="w-100 h-50  d-flex justify-content-center align-items-center ">
                      <Down />
                    </section>
                  </div>
                </main>
              </section>
            </section>
          </footer>
        </article>

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
              <Undo />
            </section>
            <section
              className="border-10 bg_gray1 d-flex justify-content-center align-items-center"
              style={{ width: "50%", height: "100%" }}
            >
              <Redo />
            </section>
          </header>
          <footer className="w-100 h-50 d-flex  px-2 pt-1">
            <section
              style={{ width: "50%", height: "100%" }}
              className="me-2 border-10 bg_gray1 d-flex justify-content-center align-items-center"
            >
              <RightToLeft />
            </section>
            <section
              className="border-10 bg_gray1  d-flex justify-content-center align-items-center"
              style={{ width: "50%", height: "100%" }}
            >
              <LeftToRight />
            </section>
          </footer>
        </article>
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
      </div>
    </div>
  );
}
