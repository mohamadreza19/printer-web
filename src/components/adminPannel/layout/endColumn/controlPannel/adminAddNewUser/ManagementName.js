import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";
import { TextFieldFUN_v3 } from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";

export default function ({ ManagementName = "", margin = "" }) {
  const meta = use_addUser_controller();
  return (
    <article className="mb-4">
      <Typography.H8 className={"font-400 mb-2  " + margin}>
        {ManagementName}
      </Typography.H8>
      <section className="add-user-input-box">
        <TextFieldFUN_v3
          value={meta.state.managerName.value}
          onChange={meta.handeler.setManagerNameHandeler}
          className="w-100"
        />
        <Typography.H10 className="color_danger">
          {meta.state.managerName.errMsg}
        </Typography.H10>
      </section>
    </article>
  );
}
