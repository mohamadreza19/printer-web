import Typography from "../../../../../../styles/__ready/Typography";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
import { useNavigate } from "react-router-dom";

export default function () {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .rowOne;
  const navigate = useNavigate();
  function handle_OnChange_SelectBox(e) {
    // console.log(e.target.value);
    navigate("/admin/" + e.target.value, {
      replace: true,
    });
  }
  return (
    <article className={" " + cssClass.me_3}>
      <select
        onChange={handle_OnChange_SelectBox}
        name="cars"
        id="cars"
        className="select-extra-large"
      >
        <option value="add-product">
          <Typography.H8>{content.addNewProduct}</Typography.H8>
        </option>
        <option value="add-label">
          <Typography.H9>{content.addNewLabel}</Typography.H9>
        </option>
      </select>
    </article>
  );
}
