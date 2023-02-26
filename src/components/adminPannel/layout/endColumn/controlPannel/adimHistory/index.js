import HistoryHeader from "./HistoryHeader";
import HistorySearchBox from "./HistorySearchBox";
import Items from "./Items";
import SortBox from "./SortBox";

export default function () {
  return (
    <div className="w-100">
      <HistoryHeader />
      <HistorySearchBox />
      <SortBox />
      <Items />
    </div>
  );
}
