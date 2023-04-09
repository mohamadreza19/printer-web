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
    function HandleChangeInputValue(value) {
      const payload = {
        id: cellForCheck.id,
        content: value,
      };
      setCell(payload, "SETCONTENT");
    }
    return (
      <Full
        HandleChangeInputValue={HandleChangeInputValue}
        content={cellForCheck.content}
        isSelected={cellForCheck.isSelected}
      />
    );
  }
  if (cellForCheck.split == "vertical") {
    return (
      <SplitedColumn
        id={cellForCheck.id}
        setCell={setCell}
        children={cellForCheck.children}
        isSelected={cellForCheck.isSelected}
        childrenHandleChangeInputValue={childrenHandleChangeInputValue}
      />
    );
  }

  if (cellForCheck.split == "horizontal") {
    return (
      <SplitedRow
        id={cellForCheck.id}
        setCell={setCell}
        HandleChangeInputValue={HandleChangeInputValue}
        children={cellForCheck.children}
        isSelected={cellForCheck.isSelected}
        childrenHandleChangeInputValue={childrenHandleChangeInputValue}
      />
    );
  }
}
