import useCellReducer from "../../../../../../../../../../../../../recoil/reducer/useCellReducer";
import Full from "./Full";
import SplitedColumn from "./SplitedColumn";
import SplitedRow from "./SplitedRow";

export default function ({
  railId,
  cellForCheck,
  HandleChangeInputValue,
  childrenHandleChangeInputValue,
}) {
  const setCell = useCellReducer();
  if (cellForCheck.structure.split == "none") {
    return (
      <Full
        HandleChangeInputValue={HandleChangeInputValue}
        railId={railId}
        cell={cellForCheck}
        isSelected={cellForCheck.isSelected}
        setCell={setCell}
      />
    );
  }
  if (cellForCheck.structure.split == "vertical") {
    return (
      <SplitedColumn
        setCell={setCell}
        parent={cellForCheck}
        railId={railId}
        children={cellForCheck}
        isSelected={cellForCheck.isSelected}
      />
    );
  }

  if (cellForCheck.structure.split == "horizontal") {
    return (
      <SplitedRow
        setCell={setCell}
        HandleChangeInputValue={HandleChangeInputValue}
        parent={cellForCheck}
        railId={railId}
        children={cellForCheck}
        isSelected={cellForCheck.isSelected}
      />
    );
  }
}
