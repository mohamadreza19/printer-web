import { useEffect } from "react";
import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";

import Typography from "../../../../../../styles/__ready/Typography";
import User_DropDown from "../../../../../../styles/__ready/common/User_DropDown";

export default function ({ margin, credit }) {
  const meta = use_addUser_controller();
  useEffect(() => {
    meta.handeler.setDaysToExpireHandeler("30");
  }, []);
  if (meta.state.daysToExpire.value)
    return (
      <div className="w-100 mb-4 mt-4">
        <article
          style={{ backgroundImage: "none" }}
          className={"select-rtl position-relative d-flex align-items-center "}
        >
          <span
            style={{
              position: "absolute",
              bottom: "60px",
            }}
          >
            <Typography.H8 className={"font-400   " + margin}>
              {credit}
            </Typography.H8>
          </span>

          <input
            type="number"
            style={{ textAlign: "center" }}
            className="text-filed-input-v2"
            value={meta.state.daysToExpire.value}
            // options={[
            //   { label: "یک ماهه", value: "30" },
            //   { label: "دو ماهه", value: "60" },
            // ]}
            onChange={(e) => {
              const value = e.target.value;
              meta.handeler.setDaysToExpireHandeler(value);
            }}
          />
        </article>
        <Typography.H10 className="color_danger">
          {meta.state.daysToExpire.errMsg}
        </Typography.H10>
      </div>
    );
}
