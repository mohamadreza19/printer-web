import { useCallback, useEffect, useMemo, useState } from "react";
// import InfiniteScroll from "react-infinite-scroller";
import InfiniteScroll from "react-infinite-scroll-component";
import { AdminProduct_Label } from "../../../../../reactQuery/admin/callGetService";
import Header from "./Header";
import Items from "./Items";
import { Project_template_List_Call } from "../../../../../reactQuery/common/callGetService";
import { RedoRounded } from "@mui/icons-material";
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../../recoil/readStore";
import Textfields from "../../../../../styles/__ready/Textfields";
import { useInfiniteQuery } from "react-query";
import api_get from "../../../../../services/admin/api_get";
import { product_label_key } from "../../../../../reactQuery/querykey/admin_key";
import { apiUrl } from "../../../../../services/urlStore";
import useAdmin_CachedToken from "../../../../../utility/useAdmin_CachedToken";

export default function () {
  const [currentListValues, setCurrentValues] = useState(null);
  const [currentList, setCurrentList] = useState("Product");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const project_template = Project_template_List_Call("admin", "", null, null);

  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();

  const product = AdminProduct_Label({
    // productLableFilter: currentList,
    productLableFilter: "Product",
    search,
    limit,
    page,
  });

  function get_MapedPage() {
    switch (currentList) {
      case "Product":
        let arr = [];

        product.data.pages.forEach((item) => {
          item.prodcuts.items.forEach((itemTwo) => {
            arr.push(itemTwo);
          });
        });

        return arr;
      case "Label":
        let arr_ = [];
        return project_template.data;

      default:
        break;
    }
  }

  return (
    <div className="w-100">
      <Header
        setCurrentList={setCurrentList}
        currentList={currentList}
        setSearch={setSearch}
        search={search}
      />
      {project_template.isSuccess && product.isSuccess ? (
        <InfiniteScroll
          className="w-100 px-4"
          pullDownToRefreshThreshold={300}
          next={
            currentList === "Product"
              ? product.fetchNextPage
              : project_template.fetchNextPage
          }
          dataLength={10}
          hasMore={
            currentList === "Product"
              ? product.hasNextPage
              : project_template.hasNextPage
          }
          threshold={100}
          height={768}
          scrollableTarget
        >
          <Items items={get_MapedPage()} currentList={currentList} />
        </InfiniteScroll>
      ) : null}
    </div>
  );
}
