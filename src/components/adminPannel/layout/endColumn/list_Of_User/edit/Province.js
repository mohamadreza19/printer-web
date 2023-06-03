import { useEffect } from "react";

import Typography from "../../../../../../styles/__ready/Typography";
import User_DropDown from "../../../../../../styles/__ready/common/User_DropDown";
import { useState } from "react";
import { Public_Provinces } from "../../../../../../reactQuery/public/callGetService";

export default function ({ State = "", margin, meta }) {
  const [cachedFirst, setCachedFirst] = useState("");

  const res = Public_Provinces();
  // console.log({ cachedFirst });
  // console.log(meta.state.province.value !== cachedFirst);
  useEffect(() => {
    if (res.isSuccess && !meta.state.province.value) {
      const value = res.data[0].value;
      meta.handeler.setProvinceHandeler(value);
    }
  }, [res.isSuccess]);

  useEffect(() => {
    if (!cachedFirst && meta.state.province.value) {
      setCachedFirst(meta.state.province.value);
    }

    if (
      meta.state.province.value &&
      cachedFirst &&
      meta.state.province.value !== cachedFirst
    ) {
      meta.handeler.setCityHandeler("");
    }
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
          isAllow_ShowCurrentValue_Whitout_Seariching_in_option={true}
        />
      </article>
    );
}
