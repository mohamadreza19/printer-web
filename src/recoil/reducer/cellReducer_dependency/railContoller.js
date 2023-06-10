import { cellSplitContoller_ } from ".";

export function railController_(
  rail,
  payload,
  setSelectedCellForReadStyle = () => {},
  cellMutateCallBack = () => {},
  when_There_Isnt_Cell_CallBack = () => {}
) {
  if (rail.frontId == payload.railId) {
    const newCells = mapedCell(rail);

    return { ...rail, customLabels: newCells };
  } else {
    const newCells = mapedCell(rail);

    return { ...rail, customLabels: newCells };
  }
  function mapedCell(rail) {
    const newCells = rail.customLabels.map((item) => {
      return {
        ...item,
        structure: cellSplitContoller_(
          {
            ...item.structure,
            frontId: item.frontId,
          },
          payload,
          setSelectedCellForReadStyle,
          cellMutateCallBack,
          when_There_Isnt_Cell_CallBack
        ),
      };
    });
    return newCells;
  }
}
