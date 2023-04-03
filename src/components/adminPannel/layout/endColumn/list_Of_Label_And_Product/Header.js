import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Textfields from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <header className="w-100 d-flex justify-content-between pb-3 border-bottom-gray">
      <article className="d-flex align-items-center">
        <section className="d-flex align-items-center">
          <Icons.Labels classNameForPath="fill_black" />
          <Typography.H8 className={"font-500 " + cssClass.ms_2}>
            لیست محصولات و لیبل ها
          </Typography.H8>
        </section>
      </article>
      <article className=" d-flex align-items-center">
        <section className={"d-flex align-items-center " + cssClass.me_2}>
          <select name="cars" id="cars" className="select-medium">
            <option value="همه موارد">
              <Typography.H8>همه موارد</Typography.H8>
            </option>
            <option value="کرج">
              <Typography.H9>کرج</Typography.H9>
            </option>
          </select>
        </section>
        <section className="search_box">
          <Textfields.v2_SearchBox placeholder="جست و جوی محصول" />
        </section>
      </article>
    </header>
  );
}
