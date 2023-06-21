import InfiniteScroll from "react-infinite-scroll-component";

import Header from "./Header";
import Items from "./Items";
import { useRef, useState } from "react";
import { AdminUsers } from "../../../../../reactQuery/admin/callGetService";
import { useContent_Based_Language } from "../../../../../recoil/readStore";

export default function () {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("ASC");
  const resposne = AdminUsers(search, order);
  const content = useContent_Based_Language();
  const headerContent = content.AdminPannel.end_col.listOfUserAndAdmin.header;
  const itemContent = content.AdminPannel.end_col.listOfUserAndAdmin.component;

  return (
    <div
      className="w-100 
      
      "
    >
      <Header headerContent={headerContent} setSearch={setSearch} />
      <InfiniteScroll
        className="w-100 px-3 "
        pullDownToRefreshThreshold={300}
        next={resposne.fetchNextPage}
        dataLength={resposne.data}
        hasMore={resposne.hasNextPage}
        threshold={100}
        height={580}
        scrollableTarget
      >
        <Items items={resposne.data} itemContent={itemContent} />
      </InfiniteScroll>
    </div>
  );
}
