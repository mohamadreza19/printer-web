import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
export default function () {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.controlPannel.row1
      .AddNewUser;
  return (
    <div
      className={
        "w-100 d-flex  border-bottom-gray pb-3 d-flex justify-content-between px-4 "
      }
    >
      <section className="d-flex">
        <Icons.AddNewProject classNameForPath="fill_black" />
        <Typography.H7 className={cssClass.ms_2}>
          {"افزودن محصول / لیبل جدید"}
        </Typography.H7>
      </section>
      <section className="">
        <Buttons.Outlined className="button_extra-large_v1">
          <Typography.H8>{"آپلود به شکل فایل اکسل"}</Typography.H8>
        </Buttons.Outlined>
      </section>
    </div>
  );
}
