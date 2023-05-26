import InfiniteScroll from "react-infinite-scroll-component";

import Header from "./Header";
import Items from "./Items";
import { useRef } from "react";
import { AdminUsers } from "../../../../../reactQuery/admin/callGetService";

export default function () {
  const resposne = AdminUsers();
  const ref = useRef(null);
  console.log(ref);
  if (resposne.isSuccess)
    return (
      <div
        className="w-100 
      //scrollable3 
      px-3"
      >
        <Header />
        <InfiniteScroll
          className="w-100  "
          ref={ref}
          pullDownToRefreshThreshold={300}
          next={resposne.fetchNextPage}
          dataLength={resposne.data}
          hasMore={resposne.hasNextPage}
          threshold={100}
          height={580}
          scrollableTarget
        >
          <Items items={resposne.data} />
          <Items items={resposne.data} />
        </InfiniteScroll>
      </div>
    );
}
