import InfiniteScroll from "react-infinite-scroll-component";

import Header from "./Header";
import Items from "./Items";
import { useEffect, useRef, useState } from "react";
import { AdminUsers } from "../../../../../reactQuery/admin/callGetService";
import { useContent_Based_Language } from "../../../../../recoil/readStore";
import { t } from "i18next";
import { useImmer } from "use-immer";

export default function () {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("ASC");
  const resposne = AdminUsers(search, order);
  const [mapedData, setMapedData] = useImmer([]);

  const content = useContent_Based_Language();
  const headerContent = content.AdminPannel.end_col.listOfUserAndAdmin.header;
  const itemContent = content.AdminPannel.end_col.listOfUserAndAdmin.component;

  useEffect(() => {
    setMapedData([]);
    if (resposne.data && resposne.data.pages.length > 0) {
      resposne.data.pages.forEach((page) => {
        setMapedData((draft) => {
          return [...draft, ...page.items];
        });
      });
    }
  }, [resposne.isSuccess, resposne.data, search]);
  // To handle the case where `search` is cleared and we need to reset

  return (
    <div
      className="w-100 
      
      "
    >
      <Header
        headerContent={headerContent}
        setSearch={setSearch}
        searcht={t("serch")}
      />
      <InfiniteScroll
        className="w-100 px-3 "
        pullDownToRefreshThreshold={300}
        next={resposne.fetchNextPage}
        dataLength={mapedData.length}
        hasMore={resposne.hasNextPage}
        threshold={100}
        height={580}
        scrollableTarget
      >
        <Items
          items={mapedData}
          // items={mapedData}
          itemContent={itemContent}
        />
      </InfiniteScroll>
    </div>
  );
}
