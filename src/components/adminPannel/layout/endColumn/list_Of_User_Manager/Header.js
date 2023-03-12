import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Textfields from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <header className="w-100 d-flex justify-content-between pb-3 border-bottom-gray">
      <article className="d-flex align-items-center">
        <section className="d-flex align-items-center">
          <Icons.UserList classNameForPath="fill_black" />
          <Typography.H7 className={cssClass.ms_2}>
            لیست کاربران و مدیران
          </Typography.H7>
        </section>
      </article>
      <article className=" d-flex align-items-center">
        <section className={"d-flex align-items-center " + cssClass.me_2}>
          <Buttons.Outlined className="button_extra-large_v2">
            <Typography.H8>برو به لیست ادمین ها</Typography.H8>
          </Buttons.Outlined>
        </section>
        <section className="search_box">
          <Textfields.v2_SearchBox placeholder="جست و جوی محصول" />
        </section>
      </article>
    </header>
  );
}
