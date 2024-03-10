import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";

import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
//
import "react-multi-date-picker/styles/colors/yellow.css";

import useDateObject from "../../../utility/useDateObject";
import useCachedLanguage from "../../../utility/useCachedLanguage";

import Icons from "../Icons";
import Typography from "../Typography";
import Buttons from "../Buttons";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../recoil/readStore";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function ({
  submitDataPickred = () => {},
  callGetExeclFile = () => {},
  excelData,
  fileNameForDonwloadedFile = "",
}) {
  const date = useDateObject();
  const { t } = useTranslation();
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
          {t("sortingFrom")}
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
        <Typography.H9 className={"font-400 ms-3"}>{t("to")}</Typography.H9>
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
  function handleOnClickDownload_excel() {
    callGetExeclFile();
  }
  useEffect(() => {
    if (excelData) {
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = URL.createObjectURL(excelData);
      link.download = fileNameForDonwloadedFile;
      // It needs to be added to the DOM so it can be clicked
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.parentNode.removeChild(link);
      }, 0);
    }
  }, [excelData]);
  return (
    <div className=" d-flex justify-content-end px-4  ">
      <section
        style={{ direction: "rtl" }}
        className={`d-flex ${
          currentLanguage != "fa" ? "flex-row-reverse" : " "
        }`}
      >
        <From />
        <To />
      </section>
      <Buttons.Contained_Custom
        className="px-2_3rem bg_primary border-r-20  mx-2 "
        onClick={submitDataPickred}
      >
        <Typography.H9 className="font-400">{t("sort")}</Typography.H9>
      </Buttons.Contained_Custom>

      <Buttons.Outlined
        className="px-3 border-r-20   "
        onClick={handleOnClickDownload_excel}
      >
        <Typography.H9 className="font-400">{t("downloadExcel")}</Typography.H9>
      </Buttons.Outlined>
    </div>
  );
}
