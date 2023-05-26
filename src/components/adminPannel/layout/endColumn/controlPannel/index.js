import { useEffect } from "react";
import { AdminPrints } from "../../../../../helper/AdminApiQueries";
import useToastReducer from "../../../../../recoil/reducer/useToastReducer";
import Header from "./Header";
import MainHeader from "./MainHeader";
import Prints from "./Prints";
import InfiniteScroll from "react-infinite-scroll-component";

export default function () {
  const setLoading = useToastReducer();
  const { data, isLoading, error, hasNextPage, fetchNextPage } = AdminPrints(
    1,
    10,
    null,
    null,
    undefined,
    undefined,
    "ASC"
  );

  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: "",
      });
    }
    if (data) {
      setLoading({
        isShow: false,
        message: "",
      });
    }
  }, [isLoading, error, data]);

  if (data)
    return (
      <div
        className="w-100 h-100 max-h-100  "
        // style={{ overflowY: "scroll" }}
      >
        <Header />
        <main
          style={{
            height: "73%",
            // overflowY: "auto",
          }}
          className="w-100   mt-4 py-3 px-4 bg-white border-r-top-30"
        >
          <MainHeader />
          <InfiniteScroll
            className="w-100  px-4 "
            pullDownToRefreshThreshold={300}
            next={fetchNextPage}
            dataLength={data.length}
            hasMore={hasNextPage}
            threshold={100}
            height={380}
            scrollableTarget
          >
            <Prints pritns={data} />
          </InfiniteScroll>
          {/* <Prints pritns={data} /> */}
        </main>
      </div>
    );
}
