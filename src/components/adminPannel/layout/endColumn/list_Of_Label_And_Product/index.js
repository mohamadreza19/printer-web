import { useCallback, useEffect, useMemo, useState } from "react";
// import InfiniteScroll from "react-infinite-scroller";
import InfiniteScroll from "react-infinite-scroll-component";
import { AdminProduct_Label } from "../../../../../reactQuery/admin/callGetService";
import Header from "./Header";
import Items from "./Items";

export default function () {
  const [currentListValues, setCurrentValues] = useState(null);
  const [currentList, setCurrentList] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const res = AdminProduct_Label({
    productLableFilter: currentList,
    search,
    limit,
    page,
  });

  return (
    <div className="w-100  ">
      <Header
        setCurrentList={setCurrentList}
        currentList={currentList}
        setSearch={setSearch}
      />
      <InfiniteScroll
        className="w-100 px-4"
        pullDownToRefreshThreshold={300}
        next={res.fetchNextPage}
        dataLength={res.data.length}
        hasMore={res.hasNextPage}
        threshold={100}
        height={768}
        scrollableTarget
      >
        <Items items={res.data} currentList={currentList} />
      </InfiniteScroll>
    </div>
  );
}
