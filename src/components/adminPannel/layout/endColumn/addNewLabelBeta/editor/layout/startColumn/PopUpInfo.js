import { useDynamicCssClass } from "../../../../../../../../recoil/readStore";
import {
  JoinColumn,
  JoinRow,
  LeftToRight,
  Redo,
  RightToLeft,
  SpliteColumn,
  SpliteRow,
  Undo,
} from "../../../../../../../../styles/__ready/EditorIcons";
import Icons from "../../../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../../../styles/__ready/Typography";

export const PopUpInfo = ({ setShowInfoPopUp = () => {} }) => {
  const cssClass = useDynamicCssClass();
  function onClickClose() {
    setShowInfoPopUp(false);
  }
  return (
    <div
      className="position-absolute d-flex  justify-content-center align-item-center "
      style={{
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        zIndex: "5",
        height: "100%",
        backgroundColor: "#00000031",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "600px",
          borderRadius: "25px",
          background: "#F5F5F5",
        }}
        className="d-flex flex-column "
      >
        <header className="w-100 d-flex justify-content-center py-4 position-relative">
          <span
            className={"me-auto cur-pointer " + cssClass.ms_4}
            onClick={onClickClose}
          >
            <Icons.Close />
          </span>
          <Typography.H5 className="position-fixed">راهنما</Typography.H5>
        </header>
        <article className="w-100  d-flex justify-content-center flex-column   pt-4 ">
          <article
            className="d-flex justify-content-center"
            style={{
              columnGap: "35px",
              heigth: "76px",
              maxHeight: "76px",
            }}
          >
            <section
              style={{ width: "300px", heigth: "76px" }}
              className="d-flex "
            >
              <span className={` ${cssClass.me_2}`}>
                <Icons.Select_CursorPrimary />
              </span>

              <Typography.H9_5>
                با این ابزار میتوانید تریمنال هارا انتخاب کنید با دبل کلیک کردن
                روی هر ترمینال ابزار متن فعال میشود.
              </Typography.H9_5>
            </section>
            <section
              style={{ width: "300px", heigth: "76px" }}
              className="d-flex "
            >
              <span className={cssClass.me_2}>
                <Icons.Text size="popUp" />
              </span>

              <Typography.H9_5>
                با این ابزار میتوانید هر خانه را انتخاب کنید و متن دلخواه را در
                داخل هر خانه وارد کنید.
              </Typography.H9_5>
            </section>
          </article>
          <article
            className="d-flex justify-content-center mt-3"
            style={{
              columnGap: "35px",
              heigth: "76px",
              maxHeight: "76px",
            }}
          >
            <section
              style={{ width: "300px", heigth: "76px" }}
              className="d-flex "
            >
              <span className={` ${cssClass.me_2}`}>
                <Icons.Hand size="popUp" />
              </span>

              <Typography.H9_5>
                با این ابزار میتوانید جایگاه هر تریمنال روی ریل را تغییر دهید و
                ترتیب چاپ را تغییر دهید.
              </Typography.H9_5>
            </section>
            <section
              style={{ width: "300px", heigth: "76px" }}
              className="d-flex "
            >
              <span className={cssClass.me_2}>
                <Icons.Shape size="popUp" />
              </span>

              <Typography.H9_5>
                داخل این ابزار اشکال هندسی و نماد های متفاوت وجود دارد که
                میتوانید به داخل هر خانه اضافه کنید.
              </Typography.H9_5>
            </section>
          </article>
          <article
            className="d-flex justify-content-center mt-3"
            style={{
              columnGap: "35px",
              heigth: "76px",
              maxHeight: "76px",
            }}
          >
            <section
              style={{ width: "300px", heigth: "76px" }}
              className="d-flex "
            >
              <span className={` ${cssClass.me_2}`}>
                {/* <Icons size="popUp" /> */}
                <SpliteRow size="popUp" />
              </span>

              <Typography.H9_5>
                هر خانه را به دو قسمت به شکل افقی تقسیم کنید.
              </Typography.H9_5>
            </section>
            <section
              style={{ width: "300px", heigth: "76px" }}
              className="d-flex "
            >
              <span className={cssClass.me_2}>
                <JoinRow size="popUp" />
              </span>

              <Typography.H9_5>
                یک خانه و خانه زیرین را با هم به یک خانه تبدیل کنید.
              </Typography.H9_5>
            </section>
          </article>
          <article
            className="d-flex justify-content-center mt-3"
            style={{
              columnGap: "35px",
              heigth: "76px",
              maxHeight: "76px",
            }}
          >
            <section
              style={{ width: "300px", heigth: "76px" }}
              className="d-flex "
            >
              <span className={` ${cssClass.me_2}`}>
                {/* <Icons size="popUp" /> */}
                <SpliteColumn size="popUp" />
              </span>

              <Typography.H9_5>
                هر خانه را به دو قسمت به شکل افقی تقسیم کنید.
              </Typography.H9_5>
            </section>
            <section
              style={{ width: "300px", heigth: "76px" }}
              className="d-flex "
            >
              <span className={cssClass.me_2}>
                <JoinColumn size="popUp" />
              </span>

              <Typography.H9_5>
                یک خانه و خانه مجاور آن را به یک خانه تبدیل کنید.
              </Typography.H9_5>
            </section>
          </article>
          <article
            className="d-flex justify-content-center mt-3"
            style={{
              columnGap: "35px",
              heigth: "76px",
              maxHeight: "76px",
            }}
          >
            <section
              style={{ width: "300px", heigth: "76px" }}
              className="d-flex "
            >
              <span className={cssClass.me_2}>
                <Undo size="popUp" />
              </span>

              <Typography.H9_5>
                یک مرحله کار های انجام شده را به عقب بر می گرداند.
              </Typography.H9_5>
            </section>
            <section
              style={{ width: "300px", heigth: "76px" }}
              className="d-flex "
            >
              <span className={` ${cssClass.me_2}`}>
                <RightToLeft size="popUp" />
              </span>

              <Typography.H9_5>
                ترتیب چینش روی ریل را از راست به چپ تنظیم می کند
              </Typography.H9_5>
            </section>
          </article>
          <article
            className="d-flex justify-content-center mt-3"
            style={{
              columnGap: "35px",
              heigth: "76px",
              maxHeight: "76px",
            }}
          >
            <section
              style={{ width: "300px", heigth: "76px" }}
              className="d-flex "
            >
              <span className={cssClass.me_2}>
                <Redo size="popUp" />
              </span>

              <Typography.H9_5>
                یک مرحله کار های انجام شده را به جلو بر می برد.
              </Typography.H9_5>
            </section>
            <section
              style={{ width: "300px", heigth: "76px" }}
              className="d-flex "
            >
              <span className={` ${cssClass.me_2}`}>
                <LeftToRight size="popUp" />
              </span>

              <Typography.H9_5>
                ترتیب چینش روی ریل را از چپ به راست تنظیم می کند
              </Typography.H9_5>
            </section>
          </article>
        </article>
      </div>
    </div>
  );
};
