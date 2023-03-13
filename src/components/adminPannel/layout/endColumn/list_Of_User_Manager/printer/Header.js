import { useDynamicCssClass } from "../../../../../../recoil/readStore";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <header className="w-100 px-3 pb-3 border-bottom-gray d-flex align-items-center mb-5">
      <section>
        <Icons.Back size="medium_v1" />
      </section>
      <section className="mx-2">
        <Icons.Print classNameForPath="fill_black" />
      </section>
      <section className="d-flex">
        <Typography.H8 className={"font-500 " + cssClass.me_1}>
          تنظیمات پرینتر
        </Typography.H8>
        <Typography.H8 className="font-500">
          شرکت تجهیز صنعت پاسارگاد
        </Typography.H8>
      </section>
    </header>
  );
}
