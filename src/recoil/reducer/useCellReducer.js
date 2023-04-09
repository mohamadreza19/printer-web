import { useRecoilState, useSetRecoilState } from "recoil";
import { cells } from "../userEditorStore/cellsStore";
import selectionAction from "../actions/editor/actionButton/selectionbuttons";
import cellAction from "../actions/editor/cell/cell";
export default function () {
  const [state, setState] = useRecoilState(cells);

  function setCell(payload = { id: "", content: "" }, action) {
    if (!action) throw new Error("need action");
    if (action == selectionAction.SELECT) {
      const newState = state.map((item) => {
        if (item.id == payload.id) {
          return { ...item, isSelected: true };
        }
        return { ...item, isSelected: false };
      });
      setState(newState);
    }
    if (action == selectionAction.VIEW) {
      const newState = state.map((item) => {
        return { ...item, isSelected: false };
      });
      setState(newState);
    }
    if (action == cellAction.SETCONTENT) {
      // function cellSplitController(item) {
      //   if (item.split == "none") {
      //     if (item.id == payload.id) {
      //       return { ...item, content: payload.content };
      //     }
      //     return item;
      //   }
      //   if (item.split == "vertical") {
      //     const childrenUpdate = item.children.map((child) => {
      //       if (child.id == payload.id && child.split == "none") {
      //         return { ...child, content: payload.content };
      //       } else {
      //         cellSplitController(child);
      //       }

      //       return child;
      //     });
      //     return { ...item, children: childrenUpdate };
      //   }
      //   if (item.split == "horizontal") {
      //     const childrenUpdate = item.children.map((child) => {
      //       if (child.id == payload.id && child.split == "none") {
      //         return { ...child, content: payload.content };
      //       } else {
      //         cellSplitController(child);
      //       }

      //       return child;
      //     });
      //     return { ...item, children: childrenUpdate };
      //   }
      //   return item;
      // }
      function cellSplitController(cell) {
        function fullCellChecker(cellForcheck) {
          if (cellForcheck.id == payload.id) {
            return { ...cellForcheck, content: payload.content };
          }
          return cellForcheck;
        }
        function verticalCellChecker(cellForcheck) {
          console.log(cellForcheck);
          const newChilren = cellForcheck.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "horizontal") {
              return horizontalCellChecker(child);
            }
            return child;
          });
          return { ...cellForcheck, children: newChilren };
        }
        function horizontalCellChecker(cellForcheck) {
          console.log(cellForcheck);
          const newChilren = cellForcheck.children.map((child) => {
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
          return { ...cellForcheck, children: newChilren };
        }

        if (cell.split == "none") {
          return fullCellChecker(cell);
        }
        if (cell.split == "vertical") {
          return verticalCellChecker(cell);
        }
        if (cell.split == "horizontal") {
          return horizontalCellChecker(cell);
        }
        return cell;
      }
      const newState = state.map((item) => {
        return cellSplitController(item);
      });
      setState(newState);
    }
  }

  return setCell;
}
