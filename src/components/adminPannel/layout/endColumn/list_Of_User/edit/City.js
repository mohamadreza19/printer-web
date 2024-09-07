import { useEffect, useState } from "react";

import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";

import Typography from "../../../../../../styles/__ready/Typography";
import User_DropDown from "../../../../../../styles/__ready/common/User_DropDown";
import { Public_Provinces_Cities } from "../../../../../../reactQuery/public/callGetService";

export default function ({ title, value, onChange, margin, province }) {
  const res = Public_Provinces_Cities(province);

  const hanndleOnChangeCunstom = (value, label) => {
    let event = {
      target: {
        value: value,
      },
    };
    // console.log(value, label);
    onChange(event);
  };
  if (res.data && res.data.length > 0)
    return (
      <>
        <article>
          <span>
            <Typography.H8 className={"font-400 mb-2 " + margin}>
              {title}
            </Typography.H8>
          </span>
          <User_DropDown
            currentValue={value}
            onChange={hanndleOnChangeCunstom}
            options={res?.data}
            isAllow_ShowCurrentValue_Whitout_Seariching_in_option={true}
          />
        </article>
      </>
    );
}
