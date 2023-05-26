import { useEffect } from "react";
import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";

import Typography from "../../../../../../styles/__ready/Typography";
import User_DropDown from "../../../../../../styles/__ready/common/User_DropDown";

export default function ({ margin }) {
  const meta = use_addUser_controller();
  useEffect(() => {
    meta.handeler.setDaysToExpireHandeler("30");
  }, []);
  if (meta.state.daysToExpire.value)
    return (
      <div className="w-100 mb-4 mt-3">
        <article className={"  "}>
          <User_DropDown
            currentValue={meta.state.daysToExpire.value}
            options={[
              { label: "یک ماهه", value: "30" },
              { label: "دو ماهه", value: "60" },
            ]}
            onChange={meta.handeler.setDaysToExpireHandeler}
          />
        </article>
      </div>
    );
}
