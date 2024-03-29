import { useCallback } from "react";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import DateRangeSelector from "../../../../../styles/__ready/datepicker/DateRangeSelector";

import DropDown from "../../../../../styles/__ready/common/User_DropDown";
import { useState } from "react";

export default function ({
  setSelectedDate = () => {},
  setInterval = () => {},
  options = [],
  currentValue = "",
  disabled,
}) {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.view_Print_Statistics
      .header;
  return (
    <div className="w-100 d-flex justify-content-between align-items-center pb-3 border-bottom-gray">
      <section className="d-flex">
        <Icons.Trade classNameForPath="fill_black" />
        <Typography.H8 className={"font-500 " + cssClass.ms_2}>
          {content.general_print_statistics}
        </Typography.H8>
      </section>
      <section className="d-flex">
        <DateRangeSelector setSelectedDate={setSelectedDate} />
        <section className={cssClass.ms_2}>
          <DropDown
            options={options}
            currentValue={currentValue}
            onChange={setInterval}
            disabled={disabled}
          />
        </section>
      </section>
    </div>
  );
}
