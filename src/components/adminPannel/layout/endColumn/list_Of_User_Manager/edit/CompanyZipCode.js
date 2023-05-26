import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";

import { TextFieldFUN_v3 } from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";

export default function ({ CompanyZipCode = "", margin, meta }) {
  return (
    <article className="mb-4">
      <Typography.H8 className={"font-400 mb-2  " + margin}>
        {CompanyZipCode}
      </Typography.H8>
      <section className="add-user-input-box">
        <TextFieldFUN_v3
          type="number"
          className="w-100"
          value={meta.state.companyZipCode.value}
          onChange={meta.handeler.setCompanyZipCodeHandeler}
        />
        <Typography.H10 className="color_danger">
          {meta.state.companyZipCode.errMsg}
        </Typography.H10>
      </section>
    </article>
  );
}
