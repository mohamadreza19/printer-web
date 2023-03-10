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
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .header;

  return (
    <div
      className={
        "w-100 d-flex  border-bottom-gray pb-3 d-flex justify-content-between px-4 "
      }
    >
      <section className="d-flex">
        <Icons.AddNewProject classNameForPath="fill_black" />
        <Typography.H7 className={cssClass.ms_2}>
          {content.addNewProductAndLabel}
        </Typography.H7>
      </section>
      <section className="">
        <Buttons.Outlined className="button_extra-large_v1">
          <Typography.H8> {content.uploadSsExcelFile}</Typography.H8>
        </Buttons.Outlined>
      </section>
    </div>
  );
}
