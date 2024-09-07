import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";

import { TextFieldFUN_v3 } from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";

export default function ({ title, value, onChange, margin, error }) {
  return (
    <article className="mb-4">
      <Typography.H8 className={"font-400 mb-2  " + margin}>
        {title}
      </Typography.H8>
      <section className="add-user-input-box">
        <TextFieldFUN_v3
          type="number"
          value={value}
          onChange={onChange}
          className="w-100"
        />
        <Typography.H10 className="color_danger">{error}</Typography.H10>
      </section>
    </article>
  );
}
