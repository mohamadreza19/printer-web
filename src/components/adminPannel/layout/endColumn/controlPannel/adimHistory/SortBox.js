import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";

import persian_fa from "react-date-object/locales/persian_fa";
import English_fa from "react-date-object/locales/gregorian_en";
//
import "react-multi-date-picker/styles/colors/yellow.css";

import { useCallback, useEffect, useState } from "react";

import useDateobject from "../../../../../../utility/useDateObject";
import useCachedLanguage from "../../../../../../utility/useCachedLanguage";

import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";
import Buttons from "../../../../../../styles/__ready/Buttons";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
export default function () {
  const date = useDateobject();

  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  const { value: currentLanguage } = useCachedLanguage();

  function handleFromChange(e) {
    const d = new Date(e);

    date.handlechangeFromDate(e);
  }
  function handleToDateChange(e) {
    date.handlechangeToDate(e);
  }
  const From = () => {
    const FromInput = ({ openCalendar, stringDate, handleValueChange }) => {
      return (
        <div className="calendar-input bg-white border py-3 px-1 d-flex align-items-center border-r-20 justify-content-center">
          <input
            onFocus={openCalendar}
            onChange={handleValueChange}
            value={stringDate}
            style={{
              textAlign: "center",
            }}
            className={`text-filed-input-v2 placeholder-v1 disabled_gray2 ${
              currentLanguage != "fa" && "font-English"
            }`}
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
    };
    return currentLanguage === "fa" ? (
      <section className={"d-flex align-items-center "}>
        <Typography.H9 className={"font-400 me-3"}>
          {content.userPannel.end_col.historyOfPrinting.calender.from}
        </Typography.H9>
        <DatePicker
          render={<FromInput />}
          className=""
          calendarPosition="bottom-right"
          calendar={persian}
          locale={persian_fa}
          value={date.ui.from}
          onChange={handleFromChange}
        />
      </section>
    ) : (
      <section className="d-flex align-items-center flex-row-reverse">
        <Typography.H9 className={"font-400 ms-3"}>
          {content.userPannel.end_col.historyOfPrinting.calender.from}
        </Typography.H9>
        <DatePicker
          render={<FromInput />}
          className=""
          calendarPosition="bottom-right"
          onChange={handleFromChange}
          value={date.ui.from}
        />
      </section>
    );
  };
  const To = () => {
    const ToInput = ({ openCalendar, stringDate, handleValueChange }) => {
      return (
        <div className="calendar-input bg-white border py-3 px-1 d-flex align-items-center border-r-20 justify-content-center">
          <input
            onFocus={openCalendar}
            onChange={handleValueChange}
            value={stringDate}
            style={{
              textAlign: "center",
            }}
            className={`text-filed-input-v2 placeholder-v1 disabled_gray2 ${
              currentLanguage != "fa" && "font-English"
            }`}
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
    };
    return currentLanguage == "fa" ? (
      <section className={"d-flex align-items-center "}>
        <Typography.H9 className={"font-400 mx-3 "}>
          {content.userPannel.end_col.historyOfPrinting.calender.to}
        </Typography.H9>
        <DatePicker
          render={<ToInput />}
          className=""
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          inputClass="font-vazir "
          containerClassName="font-vazir "
          onChange={handleToDateChange}
          value={date.ui.to}
        />
      </section>
    ) : (
      <section className="d-flex align-items-center flex-row-reverse">
        <Typography.H9 className={"font-400 mx-3 "}>
          {content.userPannel.end_col.historyOfPrinting.calender.to}
        </Typography.H9>
        <DatePicker
          render={<ToInput />}
          className=""
          calendarPosition="bottom-right"
          value={date.ui.to}
          onChange={handleToDateChange}
        />
      </section>
    );
  };

  return (
    <div className="mt-4 d-flex justify-content-end pb-3 ">
      <section
        style={{ direction: "rtl" }}
        className={`d-flex ${
          currentLanguage != "fa" ? "flex-row-reverse" : " "
        }`}
      >
        <From />
        <To />
      </section>
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
