export function cellSplitContoller_(
  customLabels,
  payload,
  setSelectedCellForReadStyle = () => {},
  cellMutateCallBack = () => {},
  when_There_Isnt_Cell_CallBack = () => {}
) {
  if (customLabels.structure.split == "none") {
    return fullCellChecker(customLabels);
  }
  if (customLabels.structure.split == "vertical") {
    return verticalCellChecker(customLabels);
  }
  if (customLabels.structure.split == "horizontal") {
    return horizontalCellChecker(customLabels);
  }
  function fullCellChecker(cellForCheck) {
    if (payload.cellId == cellForCheck.frontId) {
      const a = cellMutateCallBack(cellForCheck);

      setSelectedCellForReadStyle(a.structure?.content.style || null);

      return a;
    }
    return when_There_Isnt_Cell_CallBack(cellForCheck);
  }
  function verticalCellChecker(cellForCheck) {
    const mapedChildren = cellForCheck.structure.children.map((child) => {
      if (child.structure.split == "none") {
        return fullCellChecker(child);
      }
      if (child.structure.split == "vertical") {
        // return {
        //   child,
        //   structure: {
        //     ...child.structure,
        //     children: verticalCellChecker(children),
        //   },
        // };
        return verticalCellChecker(child);
      }
      if (child.structure.split == "horizontal") {
        return horizontalCellChecker(child);
      }
      return child;
    });

    return {
      ...cellForCheck,
      structure: {
        ...cellForCheck.structure,
        children: mapedChildren,
      },
    };
  }
  function horizontalCellChecker(cellForCheck) {
    const mapedChildren = cellForCheck.structure.children.map((child) => {
      if (child.structure.split == "none") {
        return fullCellChecker(child);
      }
      if (child.structure.split == "vertical") {
        return verticalCellChecker(child);
      }
      if (child.structure.split == "horizontal") {
        return horizontalCellChecker(child);
      }
      return child;
    });

    return {
      ...cellForCheck,
      structure: {
        ...cellForCheck.structure,
        children: mapedChildren,
      },
    };
  }
}
