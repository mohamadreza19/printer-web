import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useImmer } from "use-immer";

const useInfinitScroll = ({
  pullDownToRefreshThreshold = 300,
  next = () => {},
  hasMore = true,
  threshold = 100,
  height = 580,
  responseData = { pages: [] },
  mappedData = [], // Correctly match the prop name
  setMappedData = () => {}, // Correctly match the setter function
}) => {
  useEffect(() => {
    if (responseData && responseData.pages.length > 0) {
      const newItems = responseData.pages.flatMap((page) => page.items);

      setMappedData((draft) => {
        draft.push(...newItems); // Appending the new items to the draft
      });
    }
  }, [responseData]);

  return ({ children }) => (
    <InfiniteScroll
      className="w-100 px-3"
      pullDownToRefreshThreshold={pullDownToRefreshThreshold}
      next={next}
      dataLength={mappedData.length}
      hasMore={hasMore}
      threshold={threshold}
      height={height}
    >
      {children(mappedData)}
    </InfiniteScroll>
  );
};

export default useInfinitScroll;
