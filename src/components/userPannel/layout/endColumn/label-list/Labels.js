import { Grid } from "@mui/material";
import Label from "./Label";
import InfiniteScroll from "react-infinite-scroll-component";
import useScreenShot from "../../../../../utility/useScreenShot";

export default function ({
  labels = [],
  hasNextPage,
  fetchNextPage = () => {},
  handleAdd_Bookmark = () => {},
  handleDeleteBookmark = () => {},
  isAllowShowBookmarkedLabel = false,
  filteredLabelList = [],
  labelList = [],
}) {
  const printLabel = useScreenShot();

  return (
    <InfiniteScroll
      dataLength={labels.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      height={505}
      className="w-100 d-flex flex-wrap  justify-content-center px-4 mt-4"
    >
      {!isAllowShowBookmarkedLabel
        ? labelList.map((label, index) => (
            <Label
              PrintLabel={printLabel}
              label={label}
              key={index}
              handleAdd_Bookmark={() => handleAdd_Bookmark(label)}
              handleDeleteBookmark={() => handleDeleteBookmark(label)}
            />
          ))
        : filteredLabelList.map((label, index) => (
            <Label
              PrintLabel={printLabel}
              label={label}
              key={index}
              handleAdd_Bookmark={() => handleAdd_Bookmark(label)}
              handleDeleteBookmark={() => handleDeleteBookmark(label)}
            />
          ))}
    </InfiniteScroll>
  );
}
