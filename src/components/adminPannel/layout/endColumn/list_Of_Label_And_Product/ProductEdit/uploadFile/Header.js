import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../../recoil/readStore";
import Icons from "../../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../../styles/__ready/Typography";

export default function () {
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .header;
  const cssClass = useDynamicCssClass();
  return (
    <div className={"w-100   px-4 "}>
      <section className="d-flex  border-bottom-gray pb-3 d-flex">
        <Icons.AddNewProject classNameForPath="fill_black" />
        <Typography.H8 className={cssClass.ms_2}>
          {content.addNewProductAndLabel}
        </Typography.H8>
      </section>
    </div>
  );
}
