import DatePanel from "react-multi-date-picker/plugins/date_panel";
import persian from "react-date-object/calendars/persian";
import english from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";

import DatePicker, { getAllDatesInRange } from "react-multi-date-picker";
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../recoil/readStore";
import Buttons from "../Buttons";
import Icons from "../Icons";
import Typography from "../Typography";
import { useState } from "react";

import { useRecoilState } from "recoil";
import dateRangeSelectorStore, {
  allDates_store,
} from "../../../recoil/store/datepicker/dateRangeSelectorStore";

export default function ({ setSelectedDate }) {
  /// not neccery _locale need to be in state
  const [date, setDate] = useRecoilState(dateRangeSelectorStore);

  const [allDates, setAllDates] = useRecoilState(allDates_store);

  const [dates, setDates] = useState([]);

  const language = useLanguage();
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.view_Print_Statistics
      .header;

  const Btn = ({ openCalendar, stringDate, handleValueChange }) => {
    return (
      <Buttons.Outlined_Custom
        className="button_medium_v1"
        onClick={openCalendar}
      >
        <Icons.Vector svgClassName="mx-1" />
        <Typography.H8 className={cssClass.ms_1}>
          {content.Desired_time_scale}
        </Typography.H8>
      </Buttons.Outlined_Custom>
    );
  };

  function handleChangeDate(dateObjects = []) {
    const formatedArr = dateObjects.map((date) => {
      if (language === "fa") {
        const fotmated_date = date
          .convert(english, gregorian_en)
          .format("YYYY-MM-DD");
        return fotmated_date;
      } else {
        const fotmated_date = date.format("YYYY-MM-DD");
        return fotmated_date;
      }
    });
    setSelectedDate(formatedArr);
  }

  return (
    <DatePicker
      render={<Btn />}
      plugins={[<DatePanel position="left" />]}
      range
      calendar={language === "fa" ? persian : english}
      locale={language === "fa" ? persian_fa : gregorian_en}
      calendarPosition="bottom-right"
      onChange={(dateObjects) => {
        console.log(dateObjects);
        setDates(dateObjects);
        handleChangeDate(dateObjects);
        setAllDates(getAllDatesInRange(dateObjects));
      }}
      value={allDates}
    />
  );
}
