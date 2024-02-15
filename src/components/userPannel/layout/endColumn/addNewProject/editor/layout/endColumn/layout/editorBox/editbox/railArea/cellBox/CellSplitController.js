import { Admin_User_Symbol } from "../../../../../../../../../../../../../reactQuery/common/callGetService";
import useCellReducer from "../../../../../../../../../../../../../recoil/reducer/useCellReducer";
import Full from "./Full";
import SplitedColumn from "./SplitedColumn";
import SplitedRow from "./SplitedRow";

export default function ({
  cellForCheck,
  index,
  removeBorderRight,
  removeBorderBottom,
  isCellSplitedFromRow,
}) {
  const symbolDetail = Admin_User_Symbol("user");

  if (cellForCheck?.split == "none") {
    return (
      <Full
        removeBorderRight={removeBorderRight}
        removeBorderBottom={removeBorderBottom}
        isCellSplitedFromRow={isCellSplitedFromRow}
        index={index}
        symbolDetail={symbolDetail}
        cell={cellForCheck}
        isSelected={cellForCheck.isSelected}
      />
    );
  }
  if (cellForCheck.split == "vertical") {
    return (
      <SplitedColumn
        index={index}
        child={cellForCheck}
        isSelected={cellForCheck.isSelected}
      />
    );
  }

  if (cellForCheck.split == "horizontal") {
    return (
      <SplitedRow
        index={index}
        child={cellForCheck}
        isSelected={cellForCheck.isSelected}
      />
    );
  }
}
