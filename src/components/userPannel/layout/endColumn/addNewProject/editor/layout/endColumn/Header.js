import {
  useDynamicCssClass,
  useLanguage,
} from "../../../../../../../../recoil/readStore";
import Icons from "../../../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../../../styles/__ready/Typography";
import Buttons from "../../../../../../../../styles/__ready/Buttons";

export default function () {
  const language = useLanguage();

  const beForward = language == "fa" ? true : false;
  const cssClass = useDynamicCssClass();

  return (
    <header className="w-100 d-flex align-items-center justify-content-between  pt-4 px-4">
      <article className="d-flex">
        <section className="d-flex">
          <Icons.UserName svgClassName="mx-2" />
          <Typography.H8 className="">@taghizsandatpsgad</Typography.H8>
        </section>
        <section className="d-flex">
          <Icons.Back
            svgClassName="mx-3"
            size="small"
            pathClassName="fill_disabled"
            beForward={beForward}
          />
          <Typography.H8 className="">افزودن پروژه جدید</Typography.H8>
        </section>
        <section className="d-flex">
          <Icons.Back
            svgClassName="mx-3"
            size="small"
            pathClassName="fill_disabled"
            beForward={beForward}
          />
          <Typography.H8 className="">نام پروژه</Typography.H8>
        </section>
        <section className="d-flex">
          <Icons.Back
            svgClassName="mx-3"
            size="small"
            pathClassName="fill_disabled"
            beForward={beForward}
          />
          <Typography.H8 className="">ادیتور</Typography.H8>
        </section>
      </article>
      <article className="d-flex">
        <Buttons.Outlined className="editor-header-button_extra-medium">
          <Icons.Editor_ExportFile size="large" />
          <Typography.H7 className={cssClass.ms_1}>خروجی گرفتن</Typography.H7>
        </Buttons.Outlined>
        <Buttons.Contained className="editor-header-button_extra-small mx-3">
          <Icons.Editor_Print size="large" />
          <Typography.H7 className={cssClass.ms_1 + " font-300"}>
            چاپ
          </Typography.H7>
        </Buttons.Contained>
        <Buttons.Contained className="editor-header-button_extra-large">
          <Icons.Editor_Save size="medium" />
          <Typography.H7 className={cssClass.ms_1 + " font-300"}>
            ذخیره سازی و ادامه
          </Typography.H7>
        </Buttons.Contained>
      </article>
    </header>
  );
}
