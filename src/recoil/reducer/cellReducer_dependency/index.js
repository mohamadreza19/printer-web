export function cellSplitContoller_(
  customLabels,
  payload,
  setSelectedCellForReadStyle = () => {},
  cellMutateCallBack = () => {},
  when_There_Isnt_Cell_CallBack = () => {}
) {
  if (customLabels.split == "none") {
    const a = fullCellChecker(customLabels);

    return a;
  }
  if (customLabels.split == "vertical") {
    return verticalCellChecker(customLabels);
  }
  if (customLabels.split == "horizontal") {
    return horizontalCellChecker(customLabels);
  }
  function fullCellChecker(cellForCheck) {
    if (payload.cellId == cellForCheck.frontId) {
      console.log({ cellForCheck });
      const a = cellMutateCallBack(cellForCheck);
      setSelectedCellForReadStyle(a.content.style || null);

      return a;
    }

    const isnt = when_There_Isnt_Cell_CallBack(cellForCheck);

    return isnt;
  }
  function verticalCellChecker(cellForCheck) {
    const mapedChildren = cellForCheck.children.map((child) => {
      if (child.split == "none") {
        return fullCellChecker(child);
      }
      if (child.split == "vertical") {
        return verticalCellChecker(child);
      }
      if (child.split == "horizontal") {
        return horizontalCellChecker(child);
      }
      return child;
    });

    return {
      ...cellForCheck,
      children: mapedChildren,
    };
  }
  function horizontalCellChecker(cellForCheck) {
    const mapedChildren = cellForCheck.children.map((child) => {
      if (child.split == "none") {
        return fullCellChecker(child);
      }
      if (child.split == "vertical") {
        return verticalCellChecker(child);
      }
      if (child.split == "horizontal") {
        return horizontalCellChecker(child);
      }
      return child;
    });

    return {
      ...cellForCheck,
      children: mapedChildren,
    };
  }
}
