import { useState } from "react";

import useDateObject from "../../../../../../utility/useDateObject";
import HistoryHeader from "./HistoryHeader";
import HistorySearchBox from "./HistorySearchBox";
import Items from "./Items";

import { useQueryClient } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  AdminPrints,
  AdminPrints_Excel,
} from "../../../../../../reactQuery/admin/callGetService";
import SortBox from "../../../../../../styles/__ready/datepicker/SortBox";
import { useContext_ } from "./adminHistory.context";

export default function () {
  const datePickred = useDateObject();
  const { state } = useContext_();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setendDate] = useState(null);

  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isSuccess } = AdminPrints(
    1,
    10,
    state.just_product,
    state.just_label,
    startDate,
    endDate,
    "DESC",
    state.user.id
  );
  const excel_response = AdminPrints_Excel();
  function submitDataPickred() {
    const from = datePickred.server.from;

    const to = datePickred.server.to;

    setStartDate(from);
    setendDate(to);
  }

  if (data)
    return (
      <div className="w-100  max-h-100 ">
        <article className="mb-3">
          <HistoryHeader />
          <HistorySearchBox />
        </article>

        <div className="mb-3">
          <SortBox
            submitDataPickred={submitDataPickred}
            excelData={excel_response.data}
            callGetExeclFile={() => {
              excel_response.mutate({
                page: 1,
                limit: 10,
                justProduct: state.just_product,
                justLabel: state.just_label,
                startDate,
                endDate,
                order: "ASC",
              });
            }}
            fileNameForDonwloadedFile="prints"
          />
        </div>

        <InfiniteScroll
          className="w-100  px-4 "
          pullDownToRefreshThreshold={300}
          next={fetchNextPage}
          dataLength={data.length}
          hasMore={hasNextPage}
          threshold={100}
          height={435}
          scrollableTarget
        >
          <Items items={data} justProduct={state.justProduct} />
        </InfiniteScroll>
      </div>
    );
}
