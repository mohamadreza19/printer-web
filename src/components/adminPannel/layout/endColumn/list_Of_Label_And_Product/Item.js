import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  function o() {}
  return (
    <div className="w-100 border border-r-25 p-2 d-flex justify-content-between my-2">
      <article className="d-flex">
        <div className="d-flex">
          <section
            style={{
              width: "72px",
              height: "72px",
            }}
            className=""
          >
            <img
              className="w-100 h-100 img-fill border-r-20"
              src="https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg"
            />
          </section>
          <section
            style={{
              width: "170px",
            }}
            className={
              "d-flex justify-content-center flex-column " + cssClass.ms_2
            }
          >
            <Typography.H8 className="mb-2 position-relative ">
              ترمینال پیچی سری آرت
            </Typography.H8>
            <footer className="d-flex align-item-center">
              <span>
                <Icons.Persion />
              </span>
              <span>
                <Typography.H9_5 className={"font-400 " + cssClass.ms_1}>
                  حمید رضا فرجی
                </Typography.H9_5>
              </span>
            </footer>
          </section>
        </div>
        <div
          className={
            "px-5 d-flex align-items-center justify-content-center flex-column " +
            cssClass.ms_2
          }
        >
          <span className="d-flex mb-2">
            <Typography.H9_5 className="font-500">عرض محصول</Typography.H9_5>
            <Typography.H9_5 className={cssClass.ms_2} language="en">
              245 mm
            </Typography.H9_5>
          </span>
          <span className="d-flex">
            <Typography.H9_5 className="font-500">عرض برچسب</Typography.H9_5>
            <Typography.H9_5 className={cssClass.ms_2} language="en">
              245 mm
            </Typography.H9_5>
          </span>
        </div>
      </article>
      <article className="d-flex justify-content-between align-items-center">
        <div className={cssClass.me_5 + " d-flex flex-column px-4"}>
          <section className="mb-2 ">
            <span className="d-block w-fit-content border_bottom_primary">
              <Typography.H9_5 className="color-primary font-400">
                لینک محصول در سایت
              </Typography.H9_5>
            </span>
          </section>
          <footer className="d-flex">
            <span>
              <Typography.H9_5 className="font-500">
                آخرین به روز رسانی
              </Typography.H9_5>
            </span>
            <span className={cssClass.ms_1}>
              <Typography.H10 className="font-400">دو روز پیش</Typography.H10>
            </span>
          </footer>
        </div>
        <div>
          <section className={cssClass.pe_2}>
            <Icons.Trash />
            <span className="mx-2">
              <Icons.Trade />
            </span>
            <Icons.Edit />
          </section>
        </div>
      </article>
    </div>
  );
}
