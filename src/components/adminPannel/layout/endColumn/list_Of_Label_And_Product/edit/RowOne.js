import Typography from "../../../../../../styles/__ready/Typography";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";

export default function () {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .rowOne;
  return (
    <article className={"language-card-select " + cssClass.me_3}>
      <select name="cars" id="cars" className="select-large">
        <option value="">
          <Typography.H8>{content.addNewProduct}</Typography.H8>
        </option>
        <option value="">
          <Typography.H9>{content.addNewLabel}</Typography.H9>
        </option>
      </select>
    </article>
  );
}
