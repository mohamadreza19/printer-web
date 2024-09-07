import InfiniteScroll from "react-infinite-scroll-component";

import Header from "./Header";
import Items from "./Items";
import { useRef, useState } from "react";

import { useContent_Based_Language } from "../../../../../recoil/readStore";
import { SuperAdmin_Admins } from "../../../../../reactQuery/superAdmin/callGetService";
import { useRecoilValue } from "recoil";
import { adminRole } from "../../../../../recoil/recoilStore";
import { Navigate } from "react-router-dom";
import { t } from "i18next";

export default function () {
  const role = useRecoilValue(adminRole);
  const [search, setSearch] = useState("");
  const resposne = SuperAdmin_Admins(search);
  const content = useContent_Based_Language();

  const headerContent = content.AdminPannel.end_col.listOfUserAndAdmin.header;
  const itemContent = content.AdminPannel.end_col.listOfUserAndAdmin.component;

  if (resposne.isSuccess)
    return (
      <div
        className="w-100 
      
      "
      >
        <Header
          headerContent={headerContent}
          setSearch={setSearch}
          searcht={t("search")}
        />
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
