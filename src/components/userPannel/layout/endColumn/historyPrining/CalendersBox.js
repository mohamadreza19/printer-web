import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import English_fa from "react-date-object/locales/gregorian_en";
//
import "react-multi-date-picker/styles/colors/yellow.css";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { useState } from "react";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import Buttons from "../../../../../styles/__ready/Buttons";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import useCachedLanguage from "../../../../../utility/useCachedLanguage";
export default function () {
  const [date, setDate] = useState(new Date());
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  let { value: currentLanguage } = useCachedLanguage();

  function CustomInput({ openCalendar, stringDate, handleValueChange }) {
    return (
      <div className="calendar-input bg-white border py-3 px-1 d-flex align-items-center border-r-20 justify-content-center">
        <input
          onFocus={openCalendar}
          value={stringDate}
          onChange={handleValueChange}
          style={{
            textAlign: "center",
          }}
          className={"text-filed-input-v2 placeholder-v1 disabled_gray2"}
        />
        <span
          style={{
            position: "relative",
            left: "15px",
          }}
          onClick={openCalendar}
          className="cur-pointer "
        >
          <Icons.Vector />
        </span>
      </div>
    );
  }
  const From = () => {
    return currentLanguage === "fa" ? (
      <section className={"d-flex align-items-center "}>
        <Typography.H9 className={"font-400 me-3"}>
          {content.userPannel.end_col.historyOfPrinting.calender.from}
        </Typography.H9>
        <DatePicker
          render={<CustomInput />}
          className=""
          calendarPosition="bottom-right"
          calendar={persian}
          locale={persian_fa}
        />
      </section>
    ) : (
      <section className="d-flex align-items-center flex-row-reverse">
        <Typography.H9 className={"font-400 ms-3"}>
          {content.userPannel.end_col.historyOfPrinting.calender.from}
        </Typography.H9>
        <DatePicker
          render={<CustomInput />}
          className=""
          calendarPosition="bottom-right"
        />
      </section>
    );
  };
  const To = () => {
    return currentLanguage == "fa" ? (
      <section className={"d-flex align-items-center "}>
        <Typography.H9 className={"font-400 mx-3 "}>
          {content.userPannel.end_col.historyOfPrinting.calender.to}
        </Typography.H9>
        <DatePicker
          render={<CustomInput />}
          className=""
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          inputClass="font-vazir "
          containerClassName="font-vazir "
        />
      </section>
    ) : (
      <section className="d-flex align-items-center flex-row-reverse">
        <Typography.H9 className={"font-400 mx-3 "}>
          {content.userPannel.end_col.historyOfPrinting.calender.to}
        </Typography.H9>
        <DatePicker
          render={<CustomInput />}
          className=""
          calendarPosition="bottom-right"
        />
      </section>
    );
  };
  return (
    <div className="mt-4 d-flex justify-content-end pb-3 border-bottom-gray">
      <div
        style={{ direction: "rtl" }}
        className={`d-flex ${
          currentLanguage != "fa" ? "flex-row-reverse" : " "
        }`}
      >
        <From />
        <To />
      </div>
      <Buttons.Contained_Custom className="px-2_3rem bg_primary border-r-20  mx-2 ">
        <Typography.H9 className="font-400">
          {content.userPannel.end_col.historyOfPrinting.sortButton}
        </Typography.H9>
      </Buttons.Contained_Custom>
      <Buttons.Outlined className="px-3 border-r-20   ">
        <Typography.H9 className="font-400">
          {content.userPannel.end_col.historyOfPrinting.downloadExcel}
        </Typography.H9>
      </Buttons.Outlined>
    </div>
  );
}
