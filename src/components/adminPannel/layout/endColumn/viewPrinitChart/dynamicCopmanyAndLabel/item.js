import {
  useDynamicCssClass,
  useLanguage,
} from "../../../../../../recoil/readStore";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";

export default function () {
  const language = useLanguage();
  const cssClass = useDynamicCssClass();
  return (
    <div className="height-62 d-flex justify-content-between align-items-center border border-r-20 px-4 my-2">
      <section>
        <Typography.H9_5 className="font-500">
          شرکت تجهیز صنعت پاسارگاد
        </Typography.H9_5>
      </section>
      <section>
        <Typography.H9 className="font-400">
          ایجاد توسط: حمید رضا فرجی
        </Typography.H9>
      </section>
      <section className="d-flex">
        <Typography.H9 className="font-400">آخرین فعالیت:</Typography.H9>
        <Typography.H9
          className={"font-400 " + cssClass.ms_1}
          language={language}
        >
          5 دقیقه پیش
        </Typography.H9>
      </section>
      <section className="d-flex">
        <Typography.H9 className="font-500">۱٤۰ چاپ</Typography.H9>
        <Icons.Trade className={cssClass.ms_4} />
      </section>
    </div>
  );
}
