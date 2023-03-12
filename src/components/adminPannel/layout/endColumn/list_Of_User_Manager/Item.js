import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <div
      style={{
        height: "62px",
      }}
      className="w-100 d-flex align-items-center justify-content-between border border-r-25 p-3 my-2"
    >
      <artice className="d-flex align-item-center">
        <section className={cssClass.me_4}>
          <Typography.H9_5 className="font-500">
            شرکت تجهیز صنعت پاسارگاد
          </Typography.H9_5>
        </section>
        <section className={cssClass.ms_5}>
          <Typography.H9_5 className="font-400">
            ایجاد توسط: حمید رضا فرجی
          </Typography.H9_5>
        </section>
      </artice>
      <artice className="d-flex align-item-center">
        <section>
          <Typography.H9_5 className="font-400">
            <span>انقضا اعتبار:</span>
            <span>۱٤۰۲/۰٥/۰۳</span>
            <span>(سه ماهه)</span>
          </Typography.H9_5>
        </section>
        <section className="mx-5">
          <Typography.H9_5 className="font-400">۱٤۰ چاپ</Typography.H9_5>
        </section>
        <section className={" " + cssClass.pe_2}>
          <Icons.Trash />
          <span className="mx-3">
            <Icons.Trade />
          </span>
          <Icons.Edit />
        </section>
      </artice>
    </div>
  );
}
