import useCellReducer from "../../../../../../../../../../../../../recoil/reducer/useCellReducer";
import Full from "./Full";
import SplitedColumn from "./SplitedColumn";
import SplitedRow from "./SplitedRow";

export default function ({
  cellForCheck,
  HandleChangeInputValue,
  childrenHandleChangeInputValue,
}) {
  const setCell = useCellReducer();
  if (cellForCheck.split == "none") {
    return (
      <Full
        HandleChangeInputValue={HandleChangeInputValue}
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
        children={cellForCheck.children}
        isSelected={cellForCheck.isSelected}
      />
    );
  }

  if (cellForCheck.split == "horizontal") {
    return (
      <SplitedRow
        setCell={setCell}
        HandleChangeInputValue={HandleChangeInputValue}
        parent={cellForCheck}
        children={cellForCheck.children}
        isSelected={cellForCheck.isSelected}
      />
    );
  }
}
