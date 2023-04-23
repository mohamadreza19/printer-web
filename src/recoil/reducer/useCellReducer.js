import { useRecoilState, useSetRecoilState } from "recoil";
import {
  cells,
  cells_history,
  selectedCellForReadStyle,
} from "../userEditorStore/cellsStore";
import selectionAction from "../actions/editor/actionButton/selectionbuttons";
import cellAction from "../actions/editor/cell/cell";
import editorHeaderActionButton from "../actions/editor/actionButton/editorHeaderActionButton";
import shortid from "shortid";
import { useUndoRedo } from "../../utility/undoRedo";
import {
  ColumnFour_redo,
  ColumnFour_undo,
} from "../userEditorStore/EditorHeaderActionButton";

export default function () {
  const [state, setState] = useRecoilState(cells_history);
  const setSelectedCellForReadStyle = useSetRecoilState(
    selectedCellForReadStyle
  );
  const setCanUseUndo = useSetRecoilState(ColumnFour_undo);
  const setCanUseRedo = useSetRecoilState(ColumnFour_redo);
  const { future, past, present } = state;

  const isUndoPossible = past && past.length > 0;
  const isRedoPossible = future && future.length > 0;

  if (isUndoPossible) {
    setCanUseUndo(true);
  } else {
    setCanUseUndo(false);
  }
  if (isRedoPossible) {
    setCanUseRedo(true);
  } else {
    setCanUseRedo(false);
  }

  const HistoryChanger = (newState) => {
    const { type = "", value = "" } = newState;
    if (type === "SET_HISTORY") {
      setState(() => {
        return {
          past: [...past, present],
          present: value,
          future: [],
        };
      });
    }
    if (type === "UNDO") {
      setState(() => {
        return {
          past: past.slice(0, past.length - 1),
          present: past[past.length - 1],
          future: [present, ...future],
        };
      });
    }

    if (type === "REDO") {
      setState(() => {
        return {
          past: [...past, present],
          present: future[0],
          future: future.slice(1),
        };
      });
    }
  };

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

    if (action == selectionAction.SELECT) {
      //requirement
      // payload.id

      function cellSplitController(cell) {
        function fullCellChecker(cellForCheck) {
          if (payload.cellId == cellForCheck.id) {
            const a = { ...cellForCheck, isSelected: true };

            setSelectedCellForReadStyle(a.content?.style || null);
            return a;
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

      const newState = state.present.map((item) => {
        return cellSplitController(item);
      });

      return setState((draft) => ({
        ...draft,
        present: newState,
      }));
    }
    if (action == selectionAction.VIEW) {
      function cellSplitController(cell) {
        function fullCellChecker(cellForCheck) {
          const a = { ...cellForCheck, isSelected: false };

          // setSelectedCellForReadStyle(a.content?.style || null);
          return a;
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
      const newState = state.present.map((item) => {
        return cellSplitController(item);
      });
      return setState((draft) => ({
        draft,
        present: newState,
      }));
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

            newContent = {
              values: payload.content.value,
              style: cellForcheck.content.style,
            };

            const a = { ...cellForcheck, content: newContent };

            return a;
          }
          return cellForcheck;
        }
        function verticalCellChecker(cellForcheck) {
          const newChilren = cellForcheck.children.map((child) => {
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
          return newChilren;
        }

        if (cell.split == "none") {
          return fullCellChecker(cell);
        }
        if (cell.split == "vertical") {
          return {
            ...cell,
            children: verticalCellChecker(cell),
          };
        }
        if (cell.split == "horizontal") {
          return {
            ...cell,
            children: verticalCellChecker(cell),
          };
        }
        return cell;
      }
      const newState = state.present.map((item) => {
        return cellSplitController(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
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
      const newState = state.present.map((item) => {
        return cellSplitController(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
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
                values: " ",
                style: cellforSplit.content.style,
              },
              split: "vertical",
              children: [
                {
                  // parentId: newParentId,
                  parentId: cellforSplit.id,
                  id: shortid.generate(),
                  split: "none",
                  content: {
                    values: " ",
                    style: cellforSplit.content?.style,
                  },

                  isSelected: false,
                },
                {
                  // parentId: newParentId,
                  parentId: cellforSplit.id,
                  id: shortid.generate(),
                  split: "none",
                  content: {
                    values: null,
                    style: cellforSplit.content?.style,
                  },

                  isSelected: false,
                },
              ],
            };

            return a;
          }
          return cellforSplit;
        }

        function verticalCellChecker(cellforSplit) {
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

      const newState = state.present.map((item) => {
        return splitColumnController(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
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
                  content: {
                    values: null,
                    style: cellforSplit.content?.style,
                  },

                  isSelected: false,
                },
                {
                  // parentId: newParentId,
                  parentId: cellforSplit.id,
                  id: shortid.generate(),
                  split: "none",
                  content: {
                    values: null,
                    style: cellforSplit.content?.style,
                  },

                  isSelected: false,
                },
              ],
            };
          }
          return cellforSplit;
        }
        function horizontalCellChecker(cellforSplit) {
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

      const newState = state.present.map((item) => {
        return splitRowController(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
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

      const newState = state.present.map((item) => {
        return JoinRowController(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
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

      const newState = state.present.map((item) => {
        return JoinColumnController(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.SETFONT) {
      //requirement
      //payload.cellId == parentId
      //action
      function setFountForRoot(cellForSetFont) {
        function fullCellChecker(cell) {
          if (cell.id == payload.cellId) {
            console.log(payload);
            const a = {
              ...cell,
              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  fontFamily: payload.content,
                },
              },
            };
            setSelectedCellForReadStyle(a.content.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellForSetFont.split == "none") {
          return fullCellChecker(cellForSetFont);
        }
        if (cellForSetFont.split == "vertical") {
          return {
            ...cellForSetFont,
            children: checker(cellForSetFont),
          };
        }
        if (cellForSetFont.split == "horizontal") {
          return {
            ...cellForSetFont,
            children: checker(cellForSetFont),
          };
        }
      }

      const newState = state.present.map((item) => {
        return setFountForRoot(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.FONTSTYLE) {
      //requirement
      //payload.cellId == parentId
      //action

      function setTextFontStyle(cellForSetFontStyle) {
        function fullCellChecker(cell) {
          if (cell.id == payload.cellId) {
            const a = {
              ...cell,
              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  fontStyle: payload.content,
                },
              },
            };
            setSelectedCellForReadStyle(a.content.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellForSetFontStyle.split == "none") {
          return fullCellChecker(cellForSetFontStyle);
        }
        if (cellForSetFontStyle.split == "vertical") {
          return {
            ...cellForSetFontStyle,
            children: checker(cellForSetFontStyle),
          };
        }
        if (cellForSetFontStyle.split == "horizontal") {
          return {
            ...cellForSetFontStyle,
            children: checker(cellForSetFontStyle),
          };
        }
      }

      const newState = state.present.map((item) => {
        return setTextFontStyle(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.TEXTALIGN) {
      //requirement
      //payload.cellId == parentId
      //action

      function setTextAlign(cellTextAlign) {
        function fullCellChecker(cell) {
          if (cell.id == payload.cellId) {
            console.log(payload);
            const a = {
              ...cell,
              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  textAlign: payload.content,
                },
              },
            };
            setSelectedCellForReadStyle(a.content.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellTextAlign.split == "none") {
          return fullCellChecker(cellTextAlign);
        }
        if (cellTextAlign.split == "vertical") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
        if (cellTextAlign.split == "horizontal") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
      }

      const newState = state.present.map((item) => {
        return setTextAlign(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.CHANGEFONTSIZE) {
      //requirement
      //payload.cellId == parentId
      //action

      function setTextAlign(cellTextAlign) {
        function fullCellChecker(cell) {
          if (cell.id == payload.cellId) {
            let fontSizeValue;
            let cellFontSize = cell.content.style.fontSize;
            if (payload.content == "increment") {
              fontSizeValue = +cellFontSize + 1;
            }
            if (payload.content == "decrement") {
              if (cell.content.style.fontSize > 1) {
                fontSizeValue = cellFontSize - 1;
              } else {
                fontSizeValue = 1;
              }
            }

            const a = {
              ...cell,
              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  fontSize: fontSizeValue,
                },
              },
            };
            setSelectedCellForReadStyle(a.content.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellTextAlign.split == "none") {
          return fullCellChecker(cellTextAlign);
        }
        if (cellTextAlign.split == "vertical") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
        if (cellTextAlign.split == "horizontal") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
      }

      const newState = state.present.map((item) => {
        return setTextAlign(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.CHANGEFONTANGLE) {
      //requirement
      //payload.cellId == parentId
      //action

      function setTextAlign(cellTextAlign) {
        function fullCellChecker(cell) {
          if (cell.id == payload.cellId) {
            let fontAngleValue;
            let cellFontAngle = cell.content.style.angle;
            if (payload.content == "increment") {
              fontAngleValue = +cellFontAngle + 1;
            }
            if (payload.content == "decrement") {
              // if (cell.content.style.fontSize > 1) {
              fontAngleValue = cellFontAngle - 1;
              // } else {
              //   fontAngleValue = 1;
              // }
            }

            const a = {
              ...cell,
              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  angle: fontAngleValue,
                },
              },
            };
            setSelectedCellForReadStyle(a.content.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellTextAlign.split == "none") {
          return fullCellChecker(cellTextAlign);
        }
        if (cellTextAlign.split == "vertical") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
        if (cellTextAlign.split == "horizontal") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
      }

      const newState = state.present.map((item) => {
        return setTextAlign(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.CHANGECELLMARGIN) {
      //requirement
      //payload.cellId == parentId
      //action

      function setTextAlign(cell) {
        function fullCellChecker(cellFotCheck) {
          if (cellFotCheck.id == payload.cellId) {
            let newMargin;
            let cellMargin = cellFotCheck.content.style.margin;
            if (payload.content == "increment") {
              newMargin = +cellMargin + 1;
            }

            if (payload.content == "decrement") {
              console.log("de");
              if (cellFotCheck.content.style.margin > 0) {
                console.log(newMargin);
                newMargin = cellMargin - 1;
              } else {
                newMargin = 0;
              }
            }

            console.log(cellFotCheck.content.style.margin);
            const a = {
              ...cellFotCheck,
              content: {
                ...cellFotCheck.content,
                style: {
                  ...cellFotCheck.content.style,
                  margin: newMargin,
                },
              },
            };

            setSelectedCellForReadStyle(a.content.style);
            return a;
          }
          return cellFotCheck;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cell.split == "none") {
          return fullCellChecker(cell);
        }
        if (cell.split == "vertical") {
          return {
            ...cell,
            children: checker(cell),
          };
        }
        if (cell.split == "horizontal") {
          return {
            ...cell,
            children: checker(cell),
          };
        }
      }

      const newState = state.present.map((item) => {
        return setTextAlign(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.CHANGECELLPADDING) {
      //requirement
      //payload.cellId == parentId
      //action

      function setPadding(cellTextAlign) {
        function fullCellChecker(cell) {
          if (cell.id == payload.cellId) {
            let newPadding;
            let cellPadding = cell.content.style.padding;
            if (payload.content == "increment") {
              newPadding = +cellPadding + 1;
            }
            if (payload.content == "decrement") {
              if (cell.content.style.padding > 0) {
                newPadding = cellPadding - 1;
              } else {
                newPadding = 0;
              }
            }

            const a = {
              ...cell,
              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  padding: newPadding,
                },
              },
            };

            setSelectedCellForReadStyle(a.content.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellTextAlign.split == "none") {
          return fullCellChecker(cellTextAlign);
        }
        if (cellTextAlign.split == "vertical") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
        if (cellTextAlign.split == "horizontal") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
      }

      const newState = state.present.map((item) => {
        return setPadding(item);
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.DELETECELL) {
      const newState = state.present.filter(
        (item) => item.id !== payload.cellId
      );
      console.log({ newState });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.DUPLICATECELL) {
      const matchedCellIndex = state.present.findIndex(
        (item) => item.id == payload.cellId
      );
      const newState = [...state.present];
      const cellFinded = newState[matchedCellIndex];

      function cellSplitController(cell) {
        function fullCellChecker(cellForCheck) {
          return { ...cellForCheck, id: shortid.generate() };
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
      const cellWithNewId = cellSplitController(cellFinded);

      newState.splice(matchedCellIndex, 0, cellWithNewId);
      const NewHistory = {
        type: "SET_HISTORY",
        value: newState,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.UNDO) {
      const historyPayload = {
        type: "UNDO",
      };
      if (isUndoPossible) {
        HistoryChanger(historyPayload);
      } else {
      }
    }
    if (action == cellAction.REDO) {
      const historyPayload = {
        type: "REDO",
      };
      if (isRedoPossible) {
        HistoryChanger(historyPayload);
      } else {
      }
    }
  }

  return setCell;
}
