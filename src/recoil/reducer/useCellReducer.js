import { useRecoilState, useSetRecoilState } from "recoil";
import { cells } from "../userEditorStore/cellsStore";
import selectionAction from "../actions/editor/actionButton/selectionbuttons";
import cellAction from "../actions/editor/cell/cell";
import editorHeaderActionButton from "../actions/editor/actionButton/editorHeaderActionButton";
import shortid from "shortid";

export default function () {
  const [state, setState] = useRecoilState(cells);

  function setCell(
    payload = {
      cellId: " ",
      content: {
        value: "",
        style: {
          fontSize: "14",
          angle: "14",
          textAlign: "center",
          fontStyle: "bold",
        },
      },
    },
    action
  ) {
    if (!action) throw new Error("need action");

    if (
      action == selectionAction.SELECT ||
      action == selectionAction.SELECTPARENT
    ) {
      //requirement
      // payload.id

      function cellSplitController(cell) {
        function fullCellChecker(cellForCheck) {
          if (action == selectionAction.SELECTPARENT) {
            if (payload.cellId == cellForCheck.id && !cellForCheck.payload) {
              return { ...cellForCheck, isSelected: true };
            }
          }
          if (payload.cellId == cellForCheck.id) {
            return { ...cellForCheck, isSelected: true };
          }
          return { ...cellForCheck, isSelected: false };
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

          return { ...cellForCheck, children: mapedChildren };
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

          return { ...cellForCheck, children: mapedChildren };
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
      }

      const newState = state.map((item) => {
        return cellSplitController(item);
      });

      return setState(newState);
    }
    if (action == selectionAction.VIEW) {
      const newState = state.map((item) => {
        return { ...item, isSelected: false };
      });
      return setState(newState);
    }
    if (action == cellAction.NEWSETCONTENT) {
      function cellSplitController(cell) {
        function fullCellChecker(cellForcheck) {
          if (cellForcheck.id == payload.cellId) {
            //  add new content

            let newContent = {
              values: "",
              style: "",
            };
            if (!cellForcheck.parentId) {
              newContent = {
                values: payload.content.value,
                style: cellForcheck.content.style,
              };
            } else {
              newContent = {
                values: payload.content.value,
                style: null,
              };
            }
            return { ...cellForcheck, content: newContent };
          }
          return cellForcheck;
        }
        function verticalCellChecker(cellForcheck) {
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
        function horizontalCellChecker(cellForcheck) {
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
      return setState(newState);
    }
    if (action == cellAction.DELETECONTENT) {
      function cellSplitController(cell) {
        function fullCellChecker(cellForcheck) {
          if (cellForcheck.id == payload.cellId) {
            const copy = [...cellForcheck.contents];
            copy.pop();
            return { ...cellForcheck, contents: copy };
          }

          return cellForcheck;
        }
        function verticalCellChecker(cellForcheck) {
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
      return setState(newState);
    }
    if (action == cellAction.SPLITCOLUMN) {
      //requirement
      //action
      //payload.cellId
      function splitColumnController(cellForSplit) {
        function fullCellChecker(cellforSplit) {
          if (cellforSplit.id == payload.cellId) {
            const a = {
              ...cellforSplit,
              content: {
                values: null,
                style: cellforSplit.content?.style,
              },
              split: "vertical",
              children: [
                {
                  // parentId: newParentId,
                  parentId: cellforSplit.id,
                  id: shortid.generate(),
                  split: "none",
                  content: cellforSplit.content,

                  isSelected: false,
                },
                {
                  // parentId: newParentId,
                  parentId: cellforSplit.id,
                  id: shortid.generate(),
                  split: "none",
                  content: null,

                  isSelected: false,
                },
              ],
            };

            return a;
          }
          return cellforSplit;
        }

        function verticalCellChecker(cellforSplit) {
          console.log({ cellforSplit });
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: verticalCellChecker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: verticalCellChecker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellForSplit.split == "none") {
          return fullCellChecker(cellForSplit);
        }
        if (cellForSplit.split == "vertical") {
          // return verticalCellChecker(cellForSplit);
          return {
            ...cellForSplit,
            children: verticalCellChecker(cellForSplit),
          };
        }
        if (cellForSplit.split == "horizontal") {
          return {
            ...cellForSplit,
            children: verticalCellChecker(cellForSplit),
          };
        }

        return cellForSplit;
      }

      const newState = state.map((item) => {
        return splitColumnController(item);
      });
      return setState(newState);
    }
    if (action == cellAction.SPLITROW) {
      //requirement
      //action
      //payload.cellId
      function splitRowController(cellForSplit) {
        function fullCellChecker(cellforSplit) {
          if (cellforSplit.id == payload.cellId) {
            return {
              ...cellforSplit,
              content: {
                values: null,
                style: cellforSplit.content?.style,
              },
              split: "horizontal",
              children: [
                {
                  // parentId: newParentId,
                  parentId: cellforSplit.id,
                  id: shortid.generate(),
                  split: "none",
                  content: cellforSplit.content,

                  isSelected: false,
                },
                {
                  // parentId: newParentId,
                  parentId: cellforSplit.id,
                  id: shortid.generate(),
                  split: "none",
                  content: null,

                  isSelected: false,
                },
              ],
            };
          }
          return cellforSplit;
        }
        function horizontalCellChecker(cellforSplit) {
          console.log({ cellforSplit });
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: horizontalCellChecker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: horizontalCellChecker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }

        if (cellForSplit.split == "none") {
          return fullCellChecker(cellForSplit);
        }
        if (cellForSplit.split == "vertical") {
          return {
            ...cellForSplit,
            children: horizontalCellChecker(cellForSplit),
          };
        }
        if (cellForSplit.split == "horizontal") {
          return {
            ...cellForSplit,
            children: horizontalCellChecker(cellForSplit),
          };
        }

        return cellForSplit;
      }

      const newState = state.map((item) => {
        return splitRowController(item);
      });
      return setState(newState);
    }
    if (action == cellAction.JOINROW) {
      //requirement
      //payload.cellId
      //action

      function JoinRowController(cellForJoin) {
        function fullCellChecker(cellForJoin) {
          if (cellForJoin.id == payload.cellId) {
            const a = {
              ...cellForJoin,
              split: "none",
              children: null,
              contents: cellForJoin.children[0].contents,
            };

            return a;
          }
          if (cellForJoin.id == payload.parentId) {
            const a = {
              ...cellForJoin,
              split: "none",
              children: null,
              contents: cellForJoin.children[0].contents,
            };
            // delete a.parentId;
            return a;
          }

          return cellForJoin;
        }
        function horizontalCellChecker(cellForJoin) {
          const mapedChild = cellForJoin.children.map((child) => {
            let letIt = false;
            child.children?.map((c) => {
              if (c.children) letIt = true;
            });
            if (!letIt) {
              return fullCellChecker(child);
            } else {
              return { ...child, children: horizontalCellChecker(child) };
            }
          });
          return mapedChild;
        }

        if (cellForJoin.id == payload.parentId) {
          return fullCellChecker(cellForJoin);
        }
        if (cellForJoin.split == "vertical") {
          return {
            ...cellForJoin,
            children: horizontalCellChecker(cellForJoin),
          };
        }
        if (cellForJoin.split == "horizontal") {
          return {
            ...cellForJoin,
            children: horizontalCellChecker(cellForJoin),
          };
        }

        return cellForJoin;
      }

      const newState = state.map((item) => {
        return JoinRowController(item);
      });
      return setState(newState);
    }
    if (action == cellAction.JOINCOLUMN) {
      //requirement
      //payload.cellId
      //action

      function JoinColumnController(cellForJoin) {
        function fullCellChecker(cellForJoin) {
          if (cellForJoin.id == payload.cellId) {
            const a = {
              ...cellForJoin,
              split: "none",
              children: null,
              contents: cellForJoin.children[0].contents,
            };

            return a;
          }
          if (cellForJoin.id == payload.parentId) {
            const a = {
              ...cellForJoin,
              split: "none",
              children: null,
              contents: cellForJoin.children[0].contents,
            };
            // delete a.parentId;
            return a;
          }

          return cellForJoin;
        }
        function verticalCellChecker(cellForJoin) {
          const mapedChild = cellForJoin.children.map((child) => {
            let letIt = false;
            child.children?.map((c) => {
              if (c.children) letIt = true;
            });
            if (!letIt) {
              return fullCellChecker(child);
            } else {
              return { ...child, children: verticalCellChecker(child) };
            }
          });
          return mapedChild;
        }

        if (cellForJoin.id == payload.parentId) {
          return fullCellChecker(cellForJoin);
        }
        if (cellForJoin.split == "vertical") {
          return {
            ...cellForJoin,
            children: verticalCellChecker(cellForJoin),
          };
        }
        if (cellForJoin.split == "horizontal") {
          return {
            ...cellForJoin,
            children: verticalCellChecker(cellForJoin),
          };
        }

        return cellForJoin;
      }

      const newState = state.map((item) => {
        return JoinColumnController(item);
      });
      return setState(newState);
    }
    if (action == cellAction.SETFONT) {
      //requirement
      //payload.cellId == parentId
      //action
      function setFountForRoot(cellForSetFont) {
        if (cellForSetFont.id == payload.cellId) {
          return {
            ...cellForSetFont,
            content: {
              ...cellForSetFont.content,
              style: {
                ...cellForSetFont.content.style,
                fontFamily: payload.content,
              },
            },
          };
        }
        return cellForSetFont;
      }

      const newState = state.map((item) => {
        return setFountForRoot(item);
      });
      return setState(newState);
    }
    if (action == cellAction.TEXTBOLD) {
      //requirement
      //payload.cellId == parentId
      //action
      function setTextBoldForRoot(cellForSetFont) {
        if (cellForSetFont.id == payload.cellId) {
          // console.log(cellForSetFont);
          const a = {
            ...cellForSetFont,
            content: {
              ...cellForSetFont.content,
              style: {
                ...cellForSetFont.content.style,
                fontStyle: payload.content,
              },
            },
          };
          console.log(a);
          return a;
        }
        return cellForSetFont;
      }

      const newState = state.map((item) => {
        return setTextBoldForRoot(item);
      });
      return setState(newState);
    }
    if (action == cellAction.REGULAR) {
      //requirement
      //payload.cellId == parentId
      //action
      function setTextBoldForRoot(cellForSetFont) {
        if (cellForSetFont.id == payload.cellId) {
          // console.log(cellForSetFont);
          const a = {
            ...cellForSetFont,
            content: {
              ...cellForSetFont.content,
              style: {
                ...cellForSetFont.content.style,
                fontStyle: payload.content,
              },
            },
          };

          return a;
        }
        return cellForSetFont;
      }

      const newState = state.map((item) => {
        return setTextBoldForRoot(item);
      });
      return setState(newState);
    }
  }

  return setCell;
}
