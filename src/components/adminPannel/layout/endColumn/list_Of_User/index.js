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
  const [SearchMapedData, setSearchMapedData] = useImmer([]);

  const content = useContent_Based_Language();
  const headerContent = content.AdminPannel.end_col.listOfUserAndAdmin.header;
  const itemContent = content.AdminPannel.end_col.listOfUserAndAdmin.component;

  useEffect(() => {
    if (resposne.data && resposne.data.pages.length > 0) {
      const lastPageIndex = resposne.data.pages.length - 1;
      const itemsFromLastPage = resposne.data.pages[lastPageIndex].items;
      if (search) {
        setSearchMapedData((draft) => {
          draft.length = 0; // Clear the current items
          draft.push(...itemsFromLastPage); // Append new items
        });
      } else {
        setSearchMapedData([]);
        setMapedData((draft) => {
          draft.push(...itemsFromLastPage); // Append new items
        });
      }
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
          items={search ? SearchMapedData : mapedData}
          // items={mapedData}
          itemContent={itemContent}
        />
      </InfiniteScroll>
    </div>
  );
}
