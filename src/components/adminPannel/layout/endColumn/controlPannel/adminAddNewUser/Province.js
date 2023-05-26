import { useEffect } from "react";
import { Public_Provinces } from "../../../../../../helper/PublicApiQueries";
import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";

import Typography from "../../../../../../styles/__ready/Typography";
import User_DropDown from "../../../../../../styles/__ready/common/User_DropDown";
import { useState } from "react";

export default function ({ State = "", margin }) {
  const [currentCity, SetcurrentCity] = useState(null);
  const meta = use_addUser_controller();

  const res = Public_Provinces();

  useEffect(() => {
    console.log("use Effect");
    if (res.isSuccess && !meta.state.province.value) {
      const value = res.data[0].value;
      meta.handeler.setProvinceHandeler(value);
    }
  }, [res.isSuccess]);

  useEffect(() => {
    meta.handeler.setCityHandeler("");
  }, [meta.state.province.value]);

  if (meta.state.province.value)
    return (
      <article className={" "}>
        <span>
          <Typography.H8 className={"font-400 mb-2 " + margin}>
            {State}
          </Typography.H8>
        </span>
        <User_DropDown
          currentValue={meta.state.province.value}
          options={res.data}
          onChange={meta.handeler.setProvinceHandeler}
        />
      </article>
    );
}
