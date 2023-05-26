import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
import Typography from "../../../../../../styles/__ready/Typography";

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
        name="cars"
        id="cars"
        className="select-extra-large"
        onChange={handle_OnChange_SelectBox}
      >
        <option value="add-label">
          <Typography.H8>{content.addNewLabel}</Typography.H8>
        </option>
        <option value="add-product">
          <Typography.H8>{content.addNewProduct}</Typography.H8>
        </option>
      </select>
    </article>
  );
}
