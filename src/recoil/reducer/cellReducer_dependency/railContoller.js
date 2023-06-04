import { cellSplitContoller_ } from ".";

export function railController_(
  rail,
  payload,
  setSelectedCellForReadStyle = () => {},
  cellMutateCallBack = () => {},
  when_There_Isnt_Cell_CallBack = () => {}
) {
  if (rail.frontId == payload.railId) {
    const newCells = rail.customLabels.map((item) => {
      return cellSplitContoller_(
        item,
        payload,
        setSelectedCellForReadStyle,
        cellMutateCallBack,
        when_There_Isnt_Cell_CallBack
      );
    });
    return { ...rail, customLabels: newCells };
  } else {
    return rail;
  }
}
