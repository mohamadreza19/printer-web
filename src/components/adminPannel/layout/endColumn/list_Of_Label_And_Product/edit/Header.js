import { useDynamicCssClass } from "../../../../../../recoil/readStore";
import Icons from "../../../../../../styles/__ready/Icons";
import Textfields from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <header className="w-100 d-flex justify-content-between pb-3 px-3 border-bottom-gray">
      <article className="d-flex align-items-center">
        <section className="d-flex align-items-center">
          <Icons.Labels classNameForPath="fill_black" />
          <Typography.H7 className={cssClass.ms_2}>
            لیست محصولات و لیبل ها
          </Typography.H7>
        </section>
      </article>
    </header>
  );
}
