import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";

import { TextFieldFUN_v3 } from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";

export default function ({ CompanyAddress = "", margin }) {
  const meta = use_addUser_controller();
  return (
    <article className="mb-4 ">
      <Typography.H8 className={"font-400 mb-2  " + margin}>
        {CompanyAddress}
      </Typography.H8>
      <section className="add-user-big-input-box">
        <TextFieldFUN_v3
          className="w-100"
          value={meta.state.address.value}
          onChange={meta.handeler.setAddressHandeler}
        />
        <Typography.H10 className="color_danger">
          {meta.state.address.errMsg}
        </Typography.H10>
      </section>
    </article>
  );
}
