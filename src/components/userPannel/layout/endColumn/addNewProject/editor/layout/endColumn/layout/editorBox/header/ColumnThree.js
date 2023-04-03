import {
  Angle,
  CubeSpace,
  Down,
  Text,
  TextSize,
  Up,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";

export default function () {
  return (
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
                  fontSize: "110%",
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
                  fontSize: "110%",
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
                  fontSize: "110%",
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
                  fontSize: "110%",
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
  );
}
