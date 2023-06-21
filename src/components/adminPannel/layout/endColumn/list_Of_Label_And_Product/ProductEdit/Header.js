import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
import Buttons from "../../../../../../styles/__ready/Buttons";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";
export default function () {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .header;

  return (
    <div className={"w-100  px-4  "}>
      <article className="d-flex  border-bottom-gray pb-3 d-flex justify-content-between">
        <section className="d-flex align-item-center">
          <Icons.AddNewProject classNameForPath="fill_black" />
          <Typography.H8 className={"font-500 " + cssClass.ms_2}>
            {content.addNewProductAndLabel}
          </Typography.H8>
        </section>
        {/* <section className="d-flex align-item-center">
          <Buttons.Outlined className="button_extra-large_v1">
            <Typography.H8> {content.uploadSsExcelFile}</Typography.H8>
          </Buttons.Outlined>
        </section> */}
      </article>
    </div>
  );
}
