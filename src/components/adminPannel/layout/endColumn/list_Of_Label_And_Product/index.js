import { useCallback, useEffect, useMemo, useState } from "react";
// import InfiniteScroll from "react-infinite-scroller";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  AdminProduct_Label,
  Admin_User_Image,
} from "../../../../../helper/AdminApiQueries";
import Header from "./Header";
import Items from "./Items";
import {
  useRead_admin_label_param,
  useReducer_admin_label_param,
} from "../../../../../recoil/store/params/admin_product_label";
import { memo } from "react";

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
    // <div
    //   style={{
    //     overflowY: "hidden",
    //     height: "100%",
    //   }}
    // >
    <InfiniteScroll
      className="w-100  px-4 "
      pullDownToRefreshThreshold={300}
      next={res.fetchNextPage}
      dataLength={res.data.length}
      hasMore={res.hasNextPage}
      threshold={100}
      height={768}
      scrollableTarget
    >
      <Header
        setCurrentList={setCurrentList}
        currentList={currentList}
        setSearch={setSearch}
      />
      <Items items={res.data} currentList={currentList} />
    </InfiniteScroll>
    // </div>
  );
}
