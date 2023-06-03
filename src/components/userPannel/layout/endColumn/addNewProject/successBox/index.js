import { useDynamicCssClass } from "../../../../../../recoil/readStore";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <div className="w-100">
      <header className="w-100 d-flex justify-content-center pt-5">
        <Typography.H5 className="color-primary">
          پروژه شما با موفقیت ساخته شد
        </Typography.H5>
      </header>
      <main className="w-100 d-flex justify-content-center">
        <div className="add-project-success mt-4">
          <header className="w-100 d-flex justify-content-center my-3">
            <span
              className="success-logo "
              style={{
                width: "48.11px",
                height: "48.11px",
              }}
            >
              <Icons.Cheked />
            </span>
          </header>
          <footer className="d-flex flex-column align-items-center">
            <Typography.H7 className="font-500">
              موتور صنعتی 1400 وات
            </Typography.H7>
            <section className="d-flex mt-2">
              <span className={cssClass.me_1}>
                <Icons.Persion />
              </span>
              <Typography.H7 className="font-400">محمد جواد حسنی</Typography.H7>
            </section>
            <section className="d-flex mt-3">
              <span className={cssClass.me_1}>
                <Icons.Direction pathClassName="fill_secondray_v1" />
              </span>
              <Typography.H7 className="font-400">چپ به راست</Typography.H7>
            </section>
            <section className="d-flex mt-2">
              <span className={cssClass.me_1}>
                <Icons.Stack pathClassName="fill_secondray_v1" />
              </span>
              <Typography.H7 className="font-400">۲۱ لیبل</Typography.H7>
            </section>
          </footer>
        </div>
      </main>
    </div>
  );
}
