import { useState } from "react";
import Icons from "../../../../../styles/__ready/Icons";
import Header from "./Header";
import CalendersBox from "./CalendersBox";
import Items from "./Items";

import SortBox from "../../../../../styles/__ready/datepicker/SortBox";
import useDateObject from "../../../../../utility/useDateObject";

import {
  UserProjects_Call,
  UserProjects_Excel_Call,
} from "../../../../../reactQuery/user/callGetService";
export default function () {
  const datePickred = useDateObject();
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  //

  const { data, hasNextPage, fetchNextPage } = UserProjects_Call(
    search,
    startDate,
    endDate
  );
  const get_execlFile_mutate = UserProjects_Excel_Call();
  function submitDataPickred() {
    const from = datePickred.server.from;

    const to = datePickred.server.to;

    setStartDate(from);
    setendDate(to);
  }

  if (data)
    return (
      <div className="w-100">
        <Header setSearch={setSearch} />
        <article className="mt-4 pb-4 border-bottom">
          <SortBox
            submitDataPickred={submitDataPickred}
            callGetExeclFile={() =>
              get_execlFile_mutate.mutate({
                search,
                startDate,
                endDate,
              })
            }
            excelData={get_execlFile_mutate.data}
            fileNameForDonwloadedFile="projects"
          />
        </article>
        {/* <CalendersBox /> */}
        <Items
          projects={data}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
    );
}
