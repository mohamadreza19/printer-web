import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";

import { TextFieldFUN_v3 } from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";

export default function ({
  Name_of_the_company_or_institution = "",
  margin,
  meta,
}) {
  // const meta = use_addUser_controller();

  return (
    <article>
      <Typography.H8 className={"font-400 mb-2  " + margin}>
        {Name_of_the_company_or_institution}
      </Typography.H8>
      <section className="add-user-input-box">
        <TextFieldFUN_v3
          onChange={meta.handeler.setCompanyNameHandeler}
          value={meta.state.companyName.value}
          className="w-100"
        />
        <Typography.H10 className="color_danger">
          {meta.state.companyName.errMsg}
        </Typography.H10>
      </section>
    </article>
  );
}
