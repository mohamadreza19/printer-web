import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";

import { TextFieldFUN_v3 } from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";

export default function ({ phoneNumber = "", margin, meta }) {
  return (
    <article className="mb-4">
      <Typography.H8 className={"font-400 mb-2  " + margin}>
        {phoneNumber}
      </Typography.H8>
      <section className="add-user-input-box">
        <TextFieldFUN_v3
          type="number"
          value={meta.state.phoneNumber.value}
          onChange={meta.handeler.setPhoneNumberHandeler}
          className="w-100"
        />
        <Typography.H10 className="color_danger">
          {meta.state.phoneNumber.errMsg}
        </Typography.H10>
      </section>
    </article>
  );
}
