import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { useState } from "react";
import Icons from "../../../../../styles/__ready/Icons";
import Header from "./Header";
import CalendersBox from "./CalendersBox";
import Items from "./Items";

export default function () {
  const [date, setDate] = useState(new Date());
  console.log(date);
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
  return (
    <div className="w-100">
      <Header />
      <CalendersBox />
      <Items />
    </div>
  );
}
