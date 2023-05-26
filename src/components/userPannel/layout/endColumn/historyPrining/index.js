import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { useState } from "react";
import Icons from "../../../../../styles/__ready/Icons";
import Header from "./Header";
import CalendersBox from "./CalendersBox";
import Items from "./Items";

import SortBox from "../../../../../styles/__ready/datepicker/SortBox";
import useDateObject from "../../../../../utility/useDateObject";
import { UserProjects_Qury } from "../../../../../helper/UserApiQueries";
export default function () {
  const datePickred = useDateObject();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  //

  const project = UserProjects_Qury(page, limit, startDate, endDate);

  function submitDataPickred() {
    const from = datePickred.server.from;
    console.log(from);
    const to = datePickred.server.to;
    console.log(to);
    setStartDate(from);
    setendDate(to);
  }
  if (project.data)
    return (
      <div className="w-100">
        <Header />
        <article className="mt-4 pb-4 border-bottom">
          <SortBox submitDataPickred={submitDataPickred} />
        </article>
        {/* <CalendersBox /> */}
        <Items projects={project.data.items} />
      </div>
    );
}
