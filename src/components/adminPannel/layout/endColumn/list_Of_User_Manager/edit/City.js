import { useEffect, useState } from "react";
import { Public_Provinces_Cities } from "../../../../../../helper/PublicApiQueries";
import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";

import Typography from "../../../../../../styles/__ready/Typography";
import User_DropDown from "../../../../../../styles/__ready/common/User_DropDown";

export default function ({ City = "", margin }) {
  const [currentCity, SetcurrentCity] = useState(null);
  const meta = use_addUser_controller();
  const res = Public_Provinces_Cities();

  useEffect(() => {
    console.log(meta.state.city.value);
    if (res.isSuccess && !meta.state.city.value) {
      console.log("______________--------____________");
      const value = res.data[0]?.value;
      meta.handeler.setCityHandeler(value);
    }
  }, [res.isSuccess]);
  if (meta.state.city.value)
    return (
      <>
        <article>
          <span>
            <Typography.H8 className={"font-400 mb-2 " + margin}>
              {City}
            </Typography.H8>
          </span>
          <User_DropDown
            currentValue={meta.state.city.value}
            onChange={meta.handeler.setCityHandeler}
            options={res?.data}
            isAllow_ShowCurrentValue_Whitout_Seariching_in_option={true}
          />
        </article>
      </>
    );
}
