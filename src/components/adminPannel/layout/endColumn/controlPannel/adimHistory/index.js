import { useState } from "react";

import useDateObject from "../../../../../../utility/useDateObject";
import HistoryHeader from "./HistoryHeader";
import HistorySearchBox from "./HistorySearchBox";
import Items from "./Items";
import SortBox from "./SortBox";
import { useQueryClient } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { AdminPrints } from "../../../../../../reactQuery/admin/callGetService";

export default function () {
  const datePickred = useDateObject();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [justProduct, setJustProduct] = useState(false);
  const [justLabel, setJustLabel] = useState(false);
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isSuccess } = AdminPrints(
    1,
    10,
    justProduct,
    justLabel,
    startDate,
    endDate,
    "ASC"
  );

  function submitDataPickred() {
    const from = datePickred.server.from;
    console.log(from);
    const to = datePickred.server.to;
    console.log(to);
    setStartDate(from);
    setendDate(to);
  }

  if (data)
    return (
      <div className="w-100  max-h-100 ">
        <article className="mb-3">
          <HistoryHeader />
          <HistorySearchBox
            justProduct={justProduct}
            setJustProduct={setJustProduct}
            justLabel={justLabel}
            setJustLabel={setJustLabel}
          />
        </article>

        <div className="mb-3">
          <SortBox submitDataPickred={submitDataPickred} />
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
          <Items items={data} />
        </InfiniteScroll>
      </div>
    );
}
