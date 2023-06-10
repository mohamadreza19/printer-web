import useCellReducer from "../../../../../../../../../../../../../recoil/reducer/useCellReducer";
import Full from "./Full";
import SplitedColumn from "./SplitedColumn";
import SplitedRow from "./SplitedRow";

export default function ({ railId, cellForCheck, rootFrontId }) {
  const setCell = useCellReducer();
  if (cellForCheck?.split == "none") {
    return (
      <Full
        railId={railId}
        cell={cellForCheck}
        isSelected={cellForCheck.isSelected}
        setCell={setCell}
      />
    );
  }
  if (cellForCheck.split == "vertical") {
    return (
      <SplitedColumn
        setCell={setCell}
        parent={cellForCheck}
        railId={railId}
        child={cellForCheck}
        isSelected={cellForCheck.isSelected}
      />
    );
  }

  if (cellForCheck.split == "horizontal") {
    return (
      <SplitedRow
        setCell={setCell}
        parent={cellForCheck}
        railId={railId}
        child={cellForCheck}
        isSelected={cellForCheck.isSelected}
      />
    );
  }
}
